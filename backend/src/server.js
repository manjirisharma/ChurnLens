import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import predictionRoutes from './routes/predictionRoutes.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(helmet());
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'churnlens-backend',
    modelPath: process.env.MODEL_PATH || '../Model/churn_model.pkl'
  });
});

app.get('/', (_req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ChurnLens API</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 32px; line-height: 1.5;">
        <h1>ChurnLens backend is running</h1>
        <p>This is the API server. Open the frontend app at:</p>
        <p><a href="${frontendOrigin}">${frontendOrigin}</a></p>
        <p>Health check: <a href="/api/health">/api/health</a></p>
      </body>
    </html>
  `);
});

app.use('/api', predictionRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    details: err.details
  });
});

const server = app.listen(port, () => {
  console.log(`ChurnLens API listening on http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the existing server or set PORT to another value in backend/.env.`);
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});
