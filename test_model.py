import pandas as pd
import joblib

# Load the trained model
model = joblib.load("models/best_model.pkl")

# Load the processed dataset
df = pd.read_csv("data/processed/travel_tourism_preprocessed.csv")

# Separate input features and target
X = df.drop("Annual_Visitors_M", axis=1)

# Check model input size
print("Model expects:", model.n_features_in_, "features")
print("Dataset has:", X.shape[1], "features")

# Make one prediction
sample = X.iloc[[0]]

prediction = model.predict(sample)

print("Prediction:", prediction[0])
print("Actual value:", df["Annual_Visitors_M"].iloc[0])

print("✅ Model test completed successfully!")