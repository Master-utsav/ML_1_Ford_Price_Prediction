from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

import os
import joblib
import pandas as pd

# ── App Init ─────────────────────────────────────────────
app = FastAPI()

# ── Enable CORS ──────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load Model & Scalers ─────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
print("DIR:", os.listdir(BASE_DIR))
model_path = os.path.join(BASE_DIR, "models", "ford_price_model.joblib")
scaler_path = os.path.join(BASE_DIR, "models", "scalers.joblib")

model = joblib.load(model_path)
scalers = joblib.load(scaler_path)

# ── Columns ──────────────────────────────────────────────
ALL_COLUMNS = [
    'year', 'mileage', 'tax', 'mpg', 'engineSize',
    'model_ B-MAX', 'model_ C-MAX', 'model_ EcoSport', 'model_ Edge',
    'model_ Escort', 'model_ Fiesta', 'model_ Focus', 'model_ Fusion',
    'model_ Galaxy', 'model_ Grand C-MAX', 'model_ Grand Tourneo Connect',
    'model_ KA', 'model_ Ka+', 'model_ Kuga', 'model_ Mondeo',
    'model_ Mustang', 'model_ Puma', 'model_ Ranger', 'model_ S-MAX',
    'model_ Streetka', 'model_ Tourneo Connect', 'model_ Tourneo Custom',
    'model_ Transit Tourneo', 'model_Focus',
    'transmission_Automatic', 'transmission_Manual', 'transmission_Semi-Auto',
    'fuelType_Diesel', 'fuelType_Electric', 'fuelType_Hybrid',
    'fuelType_Other', 'fuelType_Petrol'
]

NUMERICAL_COLS = ['year', 'mileage', 'tax', 'mpg', 'engineSize']

# ── Request Schema ───────────────────────────────────────
class PredictionRequest(BaseModel):
    year: float
    mileage: float
    tax: float
    mpg: float
    engineSize: float
    model: str
    transmission: str
    fuelType: str

# ── Routes ───────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(data: PredictionRequest):
    try:
        # ── 1. Build base row ─────────────────────────────
        row = {col: 0 for col in ALL_COLUMNS}

        # Numerical
        row['year']       = data.year
        row['mileage']    = data.mileage
        row['tax']        = data.tax
        row['mpg']        = data.mpg
        row['engineSize'] = data.engineSize

        # ── 2. One-hot encoding ──────────────────────────
        model_col = f'model_{data.model}'
        if model_col in row:
            row[model_col] = 1

        trans_col = f'transmission_{data.transmission}'
        if trans_col in row:
            row[trans_col] = 1

        fuel_col = f'fuelType_{data.fuelType}'
        if fuel_col in row:
            row[fuel_col] = 1

        # ── 3. Scaling ───────────────────────────────────
        for col in NUMERICAL_COLS:
            if col not in scalers:
                continue

            row[col] = scalers[col].transform(
                pd.DataFrame([[row[col]]], columns=[col])
            )[0][0]

        # ── 4. DataFrame ─────────────────────────────────
        df = pd.DataFrame([row], columns=ALL_COLUMNS)

        # ── 5. Prediction ────────────────────────────────
        price = model.predict(df)[0]

        return {
            "success": True,
            "predicted_price": round(float(price), 2)
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# if __name__ == "__main__":
#     import uvicorn

#     host = os.getenv("HOST", "127.0.0.1")
#     port = int(os.getenv("PORT", 5000))

#     uvicorn.run("app:app", host=host, port=port, reload=True)