import React, { createContext, useContext, useEffect, useState } from 'react';
import { CustomerAssessmentData, HistoryRecord, PredictionResult } from '../types';
import { predictCustomerChurn } from '../services/churnApi';

interface ChurnContextType {
  formData: CustomerAssessmentData;
  updateForm: (fields: Partial<CustomerAssessmentData>) => void;
  resetForm: () => void;
  predictionResult: PredictionResult | null;
  runPredictionEngine: (customerName: string, assessmentData?: CustomerAssessmentData) => Promise<PredictionResult>;
  history: HistoryRecord[];
  deleteHistoryRecord: (id: string) => void;
  clearHistory: () => void;
}

const ChurnContext = createContext<ChurnContextType | undefined>(undefined);

const initialFormState: CustomerAssessmentData = {
  gender: '',
  maritalStatus: '',
  cityTier: '1',
  tenure: '',
  preferredLoginDevice: '',
  preferredPaymentMode: '',
  hoursSpent: '',
  registeredDevices: '',
  noOfAddresses: '',
  preferredOrderCategory: '',
  orderCount: '',
  couponUsed: '',
  cashbackAmount: '',
  daysSinceLastOrder: '',
  orderAmountHike: '',
  warehouseToHome: '',
  customerSatisfaction: 3,
  complaint: false,
};

const defaultHistory: HistoryRecord[] = [
  {
    id: 'CS-9481',
    date: '2026-07-11',
    customerName: 'Aarav Sharma',
    gender: 'Male',
    cityTier: '1',
    tenure: 18,
    paymentMode: 'UPI',
    orderCount: 8,
    satisfaction: 4,
    complaint: false,
    probability: 14,
    riskLevel: 'Low',
  },
  {
    id: 'CS-8392',
    date: '2026-07-10',
    customerName: 'Ananya Iyer',
    gender: 'Female',
    cityTier: '3',
    tenure: 2,
    paymentMode: 'E-Wallet',
    orderCount: 1,
    satisfaction: 1,
    complaint: true,
    probability: 91,
    riskLevel: 'High',
  },
  {
    id: 'CS-7128',
    date: '2026-07-09',
    customerName: 'Kabir Mehra',
    gender: 'Male',
    cityTier: '2',
    tenure: 6,
    paymentMode: 'Credit Card',
    orderCount: 4,
    satisfaction: 2,
    complaint: true,
    probability: 68,
    riskLevel: 'Medium',
  },
  {
    id: 'CS-6291',
    date: '2026-07-08',
    customerName: 'Meera Nair',
    gender: 'Female',
    cityTier: '1',
    tenure: 24,
    paymentMode: 'Debit Card',
    orderCount: 12,
    satisfaction: 5,
    complaint: false,
    probability: 8,
    riskLevel: 'Low',
  },
  {
    id: 'CS-5281',
    date: '2026-07-05',
    customerName: 'Rahul Verma',
    gender: 'Male',
    cityTier: '3',
    tenure: 1,
    paymentMode: 'Cash on Delivery',
    orderCount: 2,
    satisfaction: 2,
    complaint: false,
    probability: 76,
    riskLevel: 'High',
  }
];

export const ChurnProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CustomerAssessmentData>(initialFormState);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    const cached = localStorage.getItem('churnsense_history');
    return cached ? JSON.parse(cached) : defaultHistory;
  });

  useEffect(() => {
    localStorage.setItem('churnsense_history', JSON.stringify(history));
  }, [history]);

  const updateForm = (fields: Partial<CustomerAssessmentData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setPredictionResult(null);
  };

  const deleteHistoryRecord = (id: string) => {
    setHistory((prev) => prev.filter((record) => record.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const runPredictionEngine = async (
    customerName: string,
    assessmentData: CustomerAssessmentData = formData
  ): Promise<PredictionResult> => {
    const { result, historyRecord } = await predictCustomerChurn(customerName, assessmentData);

    setPredictionResult(result);
    setHistory((prev) => [historyRecord, ...prev]);

    return result;
  };

  return (
    <ChurnContext.Provider value={{
      formData,
      updateForm,
      resetForm,
      predictionResult,
      runPredictionEngine,
      history,
      deleteHistoryRecord,
      clearHistory,
    }}>
      {children}
    </ChurnContext.Provider>
  );
};

export const useChurn = () => {
  const context = useContext(ChurnContext);
  if (!context) {
    throw new Error('useChurn must be used within ChurnProvider');
  }
  return context;
};
