import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(__dirname, '../..');
const predictorPath = path.resolve(__dirname, '../../scripts/predict.py');

const modelFeatures = [
  'Tenure',
  'CityTier',
  'WarehouseToHome',
  'HourSpendOnApp',
  'NumberOfDeviceRegistered',
  'SatisfactionScore',
  'NumberOfAddress',
  'Complain',
  'OrderAmountHikeFromlastYear',
  'CouponUsed',
  'OrderCount',
  'DaySinceLastOrder',
  'CashbackAmount',
  'PreferredLoginDevice',
  'PreferredPaymentMode',
  'Gender',
  'PreferedOrderCat',
  'MaritalStatus'
];

export function getModelSchema() {
  return {
    modelType: 'python-joblib',
    modelFeatures,
    frontendPayload: {
      customerName: 'string',
      inputData: 'CustomerAssessmentData'
    }
  };
}

export function predictChurn(inputData) {
  const pythonBin = process.env.PYTHON_BIN || 'python';
  const modelPath = path.resolve(backendRoot, process.env.MODEL_PATH || '../Model/churn_model.pkl');
  const timeoutMs = Number(process.env.ML_TIMEOUT_MS || 30000);
  const child = spawn(pythonBin, [predictorPath, '--model', modelPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let stdout = '';
  let stderr = '';

  const timer = setTimeout(() => {
    child.kill('SIGTERM');
  }, timeoutMs);

  child.stdin.write(JSON.stringify(inputData));
  child.stdin.end();

  return new Promise((resolve, reject) => {
    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on('close', (code) => {
      clearTimeout(timer);

      if (code !== 0) {
        const error = new Error('ML prediction failed');
        error.status = 502;
        error.details = stderr || stdout;
        reject(error);
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch (parseError) {
        parseError.status = 502;
        parseError.details = stdout;
        reject(parseError);
      }
    });
  });
}
