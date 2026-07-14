import { CustomerAssessmentData, HistoryRecord, PredictionResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface PredictResponse {
  result: PredictionResult;
  historyRecord: HistoryRecord;
}

export async function predictCustomerChurn(
  customerName: string,
  inputData: CustomerAssessmentData
): Promise<PredictResponse> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customerName, inputData })
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(details.error || 'Unable to generate churn prediction');
  }

  return response.json();
}
