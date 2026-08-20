import pandas as pd

df = pd.read_csv("travel_tourism_dataset.csv")

print("Shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nData types:")
print(df.dtypes)

print("\nMissing values:")
print(df.isnull().sum())

print("\nDuplicate rows:")
print(df.duplicated().sum())


# Convert columns to numeric
numeric_cols = [
    "Tourist_visits",
    "Avg_rainfall_mm",
    "Travel_Expenses_INR",
    "Food_expenses_INR",
    "Stay_expenses_INR"
]

for col in numeric_cols:
    df[col] = (
        df[col]
        .astype(str)
        .str.replace(",", "", regex=False)
        .astype(float)
    )

print("\nData types after conversion:")
print(df.dtypes)

print("\nConverted numeric data:")
print(df[numeric_cols].head())