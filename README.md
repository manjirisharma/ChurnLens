# ChurnLens
End-to-end ML pipeline for customer churn prediction featuring EDA, preprocessing, model comparison and actionable insights

## Run locally

Install the Python ML dependencies:

```bash
pip install -r requirements.txt
```

Start the backend API:

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Start the frontend:

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Open the app at `http://localhost:3000`.

The backend runs at `http://localhost:5000`. That port is only for API routes such as `http://localhost:5000/api/health`.

The React app calls `VITE_API_BASE_URL`, which defaults to `http://localhost:5000/api`.
