# ChurnLens Backend

Express API that connects the React frontend to the trained Python churn model.

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The Python environment used by `PYTHON_BIN` must have the packages from the root `requirements.txt`, especially `pandas`, `scikit-learn`, `xgboost`, and `joblib`.

## Endpoints

- `GET /api/health` checks the API.
- `GET /api/model/schema` returns the model feature contract.
- `POST /api/predict` accepts:

```json
{
  "customerName": "Aarav Sharma",
  "inputData": {
    "gender": "Male",
    "maritalStatus": "Married",
    "cityTier": "1",
    "tenure": 18,
    "preferredLoginDevice": "Mobile Phone",
    "preferredPaymentMode": "UPI",
    "hoursSpent": 4,
    "registeredDevices": 3,
    "noOfAddresses": 2,
    "preferredOrderCategory": "Laptop & Accessories",
    "orderCount": 8,
    "couponUsed": 2,
    "cashbackAmount": 75,
    "daysSinceLastOrder": 5,
    "orderAmountHike": 12,
    "warehouseToHome": 15,
    "customerSatisfaction": 4,
    "complaint": false
  }
}
```
