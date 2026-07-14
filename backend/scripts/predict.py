import argparse
import json
import sys

import joblib
import pandas as pd


def to_model_row(payload):
    return {
        "Tenure": payload.get("tenure", 0),
        "CityTier": int(payload.get("cityTier") or 1),
        "WarehouseToHome": payload.get("warehouseToHome", 0),
        "HourSpendOnApp": payload.get("hoursSpent", 0),
        "NumberOfDeviceRegistered": payload.get("registeredDevices", 0),
        "SatisfactionScore": payload.get("customerSatisfaction", 0),
        "NumberOfAddress": payload.get("noOfAddresses", 0),
        "Complain": 1 if payload.get("complaint") else 0,
        "OrderAmountHikeFromlastYear": payload.get("orderAmountHike", 0),
        "CouponUsed": payload.get("couponUsed", 0),
        "OrderCount": payload.get("orderCount", 0),
        "DaySinceLastOrder": payload.get("daysSinceLastOrder", 0),
        "CashbackAmount": payload.get("cashbackAmount", 0),
        "PreferredLoginDevice": payload.get("preferredLoginDevice") or "Mobile Phone",
        "PreferredPaymentMode": payload.get("preferredPaymentMode") or "Debit Card",
        "Gender": payload.get("gender") or "Male",
        "PreferedOrderCat": payload.get("preferredOrderCategory") or "Laptop & Accessories",
        "MaritalStatus": payload.get("maritalStatus") or "Single",
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", required=True)
    args = parser.parse_args()

    payload = json.loads(sys.stdin.read() or "{}")
    row = to_model_row(payload)
    frame = pd.DataFrame([row])
    model = joblib.load(args.model)

    prediction = int(model.predict(frame)[0])
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(frame)[0][1])
    else:
        probability = float(prediction)

    print(json.dumps({
        "prediction": prediction,
        "probability": probability,
        "features": row
    }))


if __name__ == "__main__":
    main()
