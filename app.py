from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="Travel Tourism Prediction API")

# Allow React/Vite to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
model = joblib.load("models/best_model.pkl")

# Load raw dataset for destination details
raw_df = pd.read_csv("data/raw/travel_tourism_dataset.csv")

# Exact feature order used during model training
FEATURES = list(model.feature_names_in_)


class PredictionRequest(BaseModel):
    destination: str
    country: str
    continent: str
    type: str
    travelExpense: float
    bestSeason: str
    temperature: float
    rating: float
    unescoSite: str


@app.get("/")
def home():
    return {
        "message": "Travel Tourism Prediction API is running"
    }


@app.get("/destinations")
def get_destinations():
    # Return destination details from the raw dataset
    columns = [
        "Destination Name",
        "Country",
        "Continent",
        "Type",
        "Avg_Travel_Expense_USD_per_day",
        "Best Season",
        "Avg_Temperature_C",
        "Avg Rating",
        "UNESCO Site",
    ]

    data = raw_df[columns].drop_duplicates().to_dict(orient="records")

    return data


@app.post("/predict")
def predict(data: PredictionRequest):

    # Start all 127 model features at 0
    row = {feature: 0 for feature in FEATURES}

    # Numeric features
    row["Avg_Travel_Expense_USD_per_day"] = data.travelExpense
    row["Avg_Temperature_C"] = data.temperature
    row["Avg_Rating"] = data.rating

    # One-hot features
    destination_col = f"Destination_Name_{data.destination}"
    country_col = f"Country_{data.country}"
    continent_col = f"Continent_{data.continent}"
    type_col = f"Type_{data.type}"
    season_col = f"Best_Season_{data.bestSeason}"

    if destination_col in row:
        row[destination_col] = 1

    if country_col in row:
        row[country_col] = 1

    if continent_col in row:
        row[continent_col] = 1

    if type_col in row:
        row[type_col] = 1

    if season_col in row:
        row[season_col] = 1

    if data.unescoSite == "Yes":
        row["UNESCO_Site_Yes"] = 1

    # EXACT same column order as training
    input_df = pd.DataFrame([row], columns=FEATURES)

    prediction = float(model.predict(input_df)[0])

    return {
        "predictedVisits": prediction,
        "demandLevel": (
            "High"
            if prediction >= 7
            else "Medium"
            if prediction >= 3
            else "Low"
        ),
        "insight": (
            f"Predicted annual tourist visits for "
            f"{data.destination} are approximately "
            f"{prediction:.2f} million."
        ),
        "model": "Gradient Boosting Regressor",
    }