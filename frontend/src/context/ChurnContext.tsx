import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerAssessmentData, PredictionResult, HistoryRecord, Recommendation } from '../types';

interface ChurnContextType {
  formData: CustomerAssessmentData;
  updateForm: (fields: Partial<CustomerAssessmentData>) => void;
  resetForm: () => void;
  predictionResult: PredictionResult | null;
  runPredictionEngine: (customerName: string) => PredictionResult;
  history: HistoryRecord[];
  deleteHistoryRecord: (id: string) => void;
  clearHistory: () => void;
}

const ChurnContext = createContext<ChurnContextType | undefined>(undefined);

const initialFormState: CustomerAssessmentData = {
  // Step 1: Personal Information
  gender: '',
  maritalStatus: '',
  cityTier: '1',
  tenure: '',

  // Step 2: Shopping Preferences
  preferredLoginDevice: '',
  preferredPaymentMode: '',
  hoursSpent: '',
  registeredDevices: '',
  noOfAddresses: '',
  preferredOrderCategory: '',

  // Step 3: Purchase & Delivery
  orderCount: '',
  couponUsed: '',
  cashbackAmount: '',
  daysSinceLastOrder: '',
  orderAmountHike: '',
  warehouseToHome: '',

  // Step 4: Customer Experience
  customerSatisfaction: 3,
  complaint: false,
};

const defaultHistory: HistoryRecord[] = [
  {
    id: "CS-9481",
    date: "2026-07-11",
    customerName: "Aarav Sharma",
    gender: "Male",
    cityTier: "1",
    tenure: 18,
    paymentMode: "UPI",
    orderCount: 8,
    satisfaction: 4,
    complaint: false,
    probability: 14,
    riskLevel: "Low",
  },
  {
    id: "CS-8392",
    date: "2026-07-10",
    customerName: "Ananya Iyer",
    gender: "Female",
    cityTier: "3",
    tenure: 2,
    paymentMode: "E-Wallet",
    orderCount: 1,
    satisfaction: 1,
    complaint: true,
    probability: 91,
    riskLevel: "High",
  },
  {
    id: "CS-7128",
    date: "2026-07-09",
    customerName: "Kabir Mehra",
    gender: "Male",
    cityTier: "2",
    tenure: 6,
    paymentMode: "Credit Card",
    orderCount: 4,
    satisfaction: 2,
    complaint: true,
    probability: 68,
    riskLevel: "Medium",
  },
  {
    id: "CS-6291",
    date: "2026-07-08",
    customerName: "Meera Nair",
    gender: "Female",
    cityTier: "1",
    tenure: 24,
    paymentMode: "Debit Card",
    orderCount: 12,
    satisfaction: 5,
    complaint: false,
    probability: 8,
    riskLevel: "Low",
  },
  {
    id: "CS-5281",
    date: "2026-07-05",
    customerName: "Rahul Verma",
    gender: "Male",
    cityTier: "3",
    tenure: 1,
    paymentMode: "Cash on Delivery",
    orderCount: 2,
    satisfaction: 2,
    complaint: false,
    probability: 76,
    riskLevel: "High",
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
    setHistory((prev) => prev.filter(record => record.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const runPredictionEngine = (customerName: string): PredictionResult => {
    // Advanced diagnostic engine modeling churn risk based on user metrics
    let score = 35; // base probability

    // 1. Complaint penalty
    if (formData.complaint) {
      score += 25;
    }

    // 2. Customer Satisfaction impact
    const sat = Number(formData.customerSatisfaction);
    if (sat === 1) score += 30;
    else if (sat === 2) score += 18;
    else if (sat === 3) score += 5;
    else if (sat === 4) score -= 12;
    else if (sat === 5) score -= 22;

    // 3. Tenure effect
    const tenureNum = Number(formData.tenure) || 0;
    if (tenureNum < 3) score += 20;
    else if (tenureNum < 6) score += 12;
    else if (tenureNum > 18) score -= 15;
    else if (tenureNum > 12) score -= 8;

    // 4. Inactivity
    const daysSinceLast = Number(formData.daysSinceLastOrder) || 0;
    if (daysSinceLast > 15) score += 15;
    else if (daysSinceLast > 8) score += 8;
    else if (daysSinceLast < 3) score -= 8;

    // 5. Order Hike
    const hike = Number(formData.orderAmountHike) || 0;
    if (hike < 3) score += 10;
    else if (hike > 15) score -= 10;

    // 6. Cashback
    const cashback = Number(formData.cashbackAmount) || 0;
    if (cashback < 30) score += 6;
    else if (cashback > 120) score -= 10;

    // Final probability mapped to 2% - 98%
    const probability = Math.max(2, Math.min(98, Math.round(score)));

    // Risk level classification
    let riskLevel: 'High' | 'Medium' | 'Low' = 'Low';
    if (probability >= 70) riskLevel = 'High';
    else if (probability >= 40) riskLevel = 'Medium';

    const isLikelyToChurn = probability >= 50;

    // Dynamic Recommendations
    const recs: Recommendation[] = [];

    if (formData.complaint) {
      recs.push({
        id: 'rec-support',
        title: 'Priority Customer Support',
        desc: 'Assign a senior relationship manager to personally call the customer and resolve any outstanding friction points or complaints within 24 hours.',
        icon: '📞',
        actionLabel: 'Schedule Priority Call'
      });
    }

    if (sat <= 2) {
      recs.push({
        id: 'rec-rewards',
        title: 'Loyalty Rewards Boost',
        desc: 'Proactively enroll the user into an exclusive loyalty program tier with a complimentary welcome benefit to rebuild trust and relationship equity.',
        icon: '🎁',
        actionLabel: 'Issue Loyalty Status'
      });
    }

    if (daysSinceLast > 10) {
      recs.push({
        id: 'rec-email',
        title: 'Personalized Email Campaign',
        desc: 'Send a personalized "We Miss You" email highlighting relevant curated recommendations in their favorite shopping category: ' + (formData.preferredOrderCategory || 'Laptops & Accessories') + '.',
        icon: '📧',
        actionLabel: 'Queue Email Campaign'
      });
    }

    if (hike < 5) {
      recs.push({
        id: 'rec-cashback',
        title: 'Offer Promotional Cashback',
        desc: 'Grant a custom $20 cashback voucher directly into their wallet account to incentivize their next transaction and stimulate wallet engagement.',
        icon: '💰',
        actionLabel: 'Apply Wallet Credit'
      });
    }

    // Always ensure at least 2 distinct strategic recommendations
    if (recs.length < 2) {
      recs.push({
        id: 'rec-coupon',
        title: 'Targeted Category Discount',
        desc: 'Distribute a high-value 25% discount coupon tailored for ' + (formData.preferredOrderCategory || 'Laptops & Accessories') + ' to capture search intent.',
        icon: '🎯',
        actionLabel: 'Send Coupon Code'
      });
    }

    const predictionId = `CS-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const result: PredictionResult = {
      id: predictionId,
      customerName: customerName || "Assessment Client",
      isLikelyToChurn,
      probability,
      riskLevel,
      timestamp,
      inputData: { ...formData },
      recommendations: recs,
    };

    setPredictionResult(result);

    // Save into history
    const newHistoryRecord: HistoryRecord = {
      id: predictionId,
      date: new Date().toISOString().split('T')[0],
      customerName: customerName || "Assessment Client",
      gender: formData.gender || 'Not Disclosed',
      cityTier: formData.cityTier || '1',
      tenure: tenureNum,
      paymentMode: formData.preferredPaymentMode || 'E-Wallet',
      orderCount: Number(formData.orderCount) || 0,
      satisfaction: sat,
      complaint: formData.complaint,
      probability,
      riskLevel,
    };

    setHistory((prev) => [newHistoryRecord, ...prev]);

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
