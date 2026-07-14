export interface CustomerAssessmentData {
  // Step 1: Personal Information
  gender: 'Male' | 'Female' | 'Others' | '';
  maritalStatus: 'Single' | 'Married' | 'Divorced' | '';
  cityTier: '1' | '2' | '3' | '';
  tenure: number | '';

  // Step 2: Shopping Preferences
  preferredLoginDevice: 'Computer' | 'Mobile' | 'Mobile Phone' | '';
  preferredPaymentMode: 'Debit Card' | 'Credit Card' | 'UPI' | 'Cash on Delivery' | 'E-Wallet' | '';
  hoursSpent: number | '';
  registeredDevices: number | '';
  noOfAddresses: number | '';
  preferredOrderCategory: 'Laptop & Accessories' | 'Mobile' | 'Fashion' | 'Grocery' | 'Others' | '';

  // Step 3: Purchase & Delivery
  orderCount: number | '';
  couponUsed: number | '';
  cashbackAmount: number | '';
  daysSinceLastOrder: number | '';
  orderAmountHike: number | ''; // %
  warehouseToHome: number | ''; // km

  // Step 4: Customer Experience
  customerSatisfaction: number; // 1-5 slider
  complaint: boolean; // toggle (Yes/No)
}

export interface Recommendation {
  id: string;
  title: string;
  desc: string;
  icon: string;
  actionLabel: string;
}

export interface PredictionResult {
  id: string;
  customerName: string;
  isLikelyToChurn: boolean;
  probability: number; // percentage
  riskLevel: 'High' | 'Medium' | 'Low';
  timestamp: string;
  inputData: CustomerAssessmentData;
  recommendations: Recommendation[];
}

export interface HistoryRecord {
  id: string;
  date: string;
  customerName: string;
  gender: string;
  cityTier: string;
  tenure: number;
  paymentMode: string;
  orderCount: number;
  satisfaction: number;
  complaint: boolean;
  probability: number;
  riskLevel: 'High' | 'Medium' | 'Low';
}
