import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChurn } from '../context/ChurnContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { User, ShoppingBag, Truck, ThumbsUp, ArrowRight, ArrowLeft, Brain, Sparkles, HelpCircle } from 'lucide-react';

export default function CustomerAssessment() {
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [validationError, setValidationError] = useState("");
  const { formData, updateForm, runPredictionEngine } = useChurn();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const cardClass = theme === 'dark' 
    ? 'bg-slate-900/40 border-slate-800/60 shadow-glass-glow' 
    : 'bg-white border-slate-200 shadow-sm';
    
  const inputClass = `w-full px-3.5 py-2.5 text-xs rounded-xl focus:outline-none focus:border-indigo-500 transition-colors ${
    theme === 'dark'
      ? 'bg-slate-950/80 border-slate-800/60 text-white placeholder-slate-600'
      : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white'
  }`;

  const labelClass = `text-xs font-bold uppercase tracking-wider ${
    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
  }`;

  const headingClass = `text-sm font-bold uppercase tracking-wider ${
    theme === 'dark' ? 'text-white' : 'text-slate-800'
  }`;

  const borderClass = theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200';

  const nextStep = () => {
    // Basic validation for name and fields before moving forward
    if (step === 1) {
      if (!customerName.trim()) {
        setValidationError("Please enter a client name for this report.");
        return;
      }
      if (!formData.gender || !formData.maritalStatus || !formData.cityTier || formData.tenure === '') {
        setValidationError("Please fill in all personal details.");
        return;
      }
    } else if (step === 2) {
      if (!formData.preferredLoginDevice || !formData.preferredPaymentMode || formData.hoursSpent === '' || formData.registeredDevices === '' || formData.noOfAddresses === '' || !formData.preferredOrderCategory) {
        setValidationError("Please complete all shopping preferences.");
        return;
      }
    } else if (step === 3) {
      if (formData.orderCount === '' || formData.couponUsed === '' || formData.cashbackAmount === '' || formData.daysSinceLastOrder === '' || formData.orderAmountHike === '' || formData.warehouseToHome === '') {
        setValidationError("Please complete all purchase & delivery statistics.");
        return;
      }
    }
    setValidationError("");
    setStep((prev) => Math.min(4, prev + 1));
  };

  const prevStep = () => {
    setValidationError("");
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError("Client name is required.");
      return;
    }
    setValidationError("");
    try {
      await runPredictionEngine(customerName);
      navigate('/app/processing');
    } catch (error) {
      setValidationError(error instanceof Error ? error.message : "Unable to run churn prediction.");
    }
  };

  const stepsMeta = [
    { num: 1, label: "Personal Info", icon: User },
    { num: 2, label: "Preferences", icon: ShoppingBag },
    { num: 3, label: "Purchases", icon: Truck },
    { num: 4, label: "Sentiment", icon: ThumbsUp },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Page Title Header */}
      <div className="space-y-1">
        <h1 className={`text-xl font-bold flex items-center gap-1.5 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          <span>Customer Retention Assessment Portal</span>
          <Sparkles className="w-4.5 h-4.5 text-cyan-400" />
        </h1>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
        }`}>Complete the metrics wizard to trigger our predictive intelligence pipeline.</p>
      </div>

      {/* Form Steps Progress Indicator */}
      <div className={`p-4.5 rounded-3xl flex justify-between items-center relative overflow-hidden transition-all duration-300 ${cardClass}`}>
        {stepsMeta.map((s, index) => {
          const StepIcon = s.icon;
          const isActive = s.num === step;
          const isCompleted = step > s.num;
          return (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center space-y-1.5 z-10">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${
                  isActive ? 'bg-indigo-500 border-indigo-400 text-white scale-110 shadow-glass-glow' :
                  isCompleted ? (theme === 'dark' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20') :
                  theme === 'dark' ? 'bg-slate-950/80 text-slate-500 border-slate-800/60' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  isActive 
                    ? (theme === 'dark' ? 'text-white' : 'text-indigo-600') 
                    : 'text-slate-500'
                }`}>{s.label}</span>
              </div>
              {index < 3 && (
                <div className={`flex-1 h-[2px] mx-2 relative overflow-hidden ${
                  theme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
                }`}>
                  <div className={`absolute left-0 top-0 bottom-0 bg-indigo-500 transition-all duration-300 ${step > s.num ? 'w-full' : 'w-0'}`} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Validation alert banner */}
      {validationError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
          ⚠ {validationError}
        </div>
      )}

      {/* Multi-step Assessment Form card */}
      <form onSubmit={handleSubmit} className={`${cardClass} p-6 rounded-3xl space-y-6 relative overflow-hidden transition-all duration-300`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: -20, x: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* STEP 1: Personal info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className={`border-b pb-2 flex justify-between items-center ${borderClass}`}>
                  <h3 className={headingClass}>Step 1: Demographic Information</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Variables (1-5 of 18)</span>
                </div>
                
                {/* Custom Client Name Input */}
                <div className="space-y-1.5">
                  <label className={`${labelClass} flex items-center gap-1`}>
                    <span>Client/Customer Name</span>
                    <span className="text-red-400 font-bold">*</span>
                  </label>
                  <input
                    id="client-name-input"
                    type="text"
                    placeholder="e.g. Priyesh Saxena"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Gender</label>
                    <select
                      id="gender-select"
                      value={formData.gender}
                      onChange={(e) => updateForm({ gender: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="">Choose Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Marital Status</label>
                    <select
                      id="marital-status-select"
                      value={formData.maritalStatus}
                      onChange={(e) => updateForm({ maritalStatus: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="">Choose Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>City Tier Classification</label>
                    <select
                      id="city-tier-select"
                      value={formData.cityTier}
                      onChange={(e) => updateForm({ cityTier: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="1">Tier 1 (Metro Area)</option>
                      <option value="2">Tier 2 (Urban Area)</option>
                      <option value="3">Tier 3 (Semi-Urban / Rural)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Account Tenure (Months)</label>
                    <input
                      id="tenure-input"
                      type="number"
                      placeholder="e.g. 18"
                      value={formData.tenure}
                      onChange={(e) => updateForm({ tenure: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Shopping Preferences */}
            {step === 2 && (
              <div className="space-y-4">
                <div className={`border-b pb-2 flex justify-between items-center ${borderClass}`}>
                  <h3 className={headingClass}>Step 2: Customer Preferences</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Variables (6-11 of 18)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Preferred Login Device</label>
                    <select
                      id="login-device-select"
                      value={formData.preferredLoginDevice}
                      onChange={(e) => updateForm({ preferredLoginDevice: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="">Select Device</option>
                      <option value="Computer">Computer</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Mobile Phone">Mobile Phone</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Preferred Payment Mode</label>
                    <select
                      id="payment-mode-select"
                      value={formData.preferredPaymentMode}
                      onChange={(e) => updateForm({ preferredPaymentMode: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="UPI">UPI (Unified Payments)</option>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                      <option value="E-Wallet">E-Wallet</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Daily Hours Spent Browsing</label>
                    <input
                      id="hours-spent-input"
                      type="number"
                      placeholder="e.g. 4"
                      value={formData.hoursSpent}
                      onChange={(e) => updateForm({ hoursSpent: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>No. of Registered Devices</label>
                    <input
                      id="registered-devices-input"
                      type="number"
                      placeholder="e.g. 3"
                      value={formData.registeredDevices}
                      onChange={(e) => updateForm({ registeredDevices: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>No. of Saved Addresses</label>
                    <input
                      id="saved-addresses-input"
                      type="number"
                      placeholder="e.g. 2"
                      value={formData.noOfAddresses}
                      onChange={(e) => updateForm({ noOfAddresses: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Preferred Order Category</label>
                    <select
                      id="order-category-select"
                      value={formData.preferredOrderCategory}
                      onChange={(e) => updateForm({ preferredOrderCategory: e.target.value as any })}
                      className={inputClass}
                    >
                      <option value="">Select Category</option>
                      <option value="Laptop & Accessories">Laptop & Accessories</option>
                      <option value="Mobile">Mobile Device</option>
                      <option value="Fashion">Fashion & Wearables</option>
                      <option value="Grocery">Grocery Essentials</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Purchase & Delivery */}
            {step === 3 && (
              <div className="space-y-4">
                <div className={`border-b pb-2 flex justify-between items-center ${borderClass}`}>
                  <h3 className={headingClass}>Step 3: Purchase & Delivery History</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Variables (12-17 of 18)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelClass}>Order Count (Last 30 Days)</label>
                    <input
                      id="order-count-input"
                      type="number"
                      placeholder="e.g. 6"
                      value={formData.orderCount}
                      onChange={(e) => updateForm({ orderCount: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Promo Coupons Applied</label>
                    <input
                      id="coupons-input"
                      type="number"
                      placeholder="e.g. 2"
                      value={formData.couponUsed}
                      onChange={(e) => updateForm({ couponUsed: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Cashback Earned ($)</label>
                    <input
                      id="cashback-input"
                      type="number"
                      placeholder="e.g. 45"
                      value={formData.cashbackAmount}
                      onChange={(e) => updateForm({ cashbackAmount: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Days Since Last Order</label>
                    <input
                      id="days-since-order-input"
                      type="number"
                      placeholder="e.g. 7"
                      value={formData.daysSinceLastOrder}
                      onChange={(e) => updateForm({ daysSinceLastOrder: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Order Value Hike (%)</label>
                    <input
                      id="order-hike-input"
                      type="number"
                      placeholder="e.g. 14"
                      value={formData.orderAmountHike}
                      onChange={(e) => updateForm({ orderAmountHike: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelClass}>Warehouse to Home Distance (km)</label>
                    <input
                      id="distance-input"
                      type="number"
                      placeholder="e.g. 12"
                      value={formData.warehouseToHome}
                      onChange={(e) => updateForm({ warehouseToHome: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Customer Experience */}
            {step === 4 && (
              <div className="space-y-6">
                <div className={`border-b pb-2 flex justify-between items-center ${borderClass}`}>
                  <h3 className={headingClass}>Step 4: Sentiment & Feedback Indices</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Variables (18-19 of 19)</span>
                </div>
                
                {/* Customer Satisfaction range slider */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className={labelClass}>Customer Satisfaction Score</span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                      theme === 'dark' 
                        ? 'text-cyan-400 bg-slate-950/80 border-slate-800/60' 
                        : 'text-cyan-600 bg-slate-50 border-slate-200'
                    }`}>
                      {formData.customerSatisfaction} / 5
                    </span>
                  </div>
                  <input
                    id="satisfaction-slider"
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={formData.customerSatisfaction}
                    onChange={(e) => updateForm({ customerSatisfaction: Number(e.target.value) })}
                    className={`w-full accent-indigo-500 h-2 rounded-lg cursor-pointer appearance-none border ${
                      theme === 'dark' ? 'bg-slate-950/80 border-slate-800/60' : 'bg-slate-100 border-slate-200'
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>1 (Poor Experience)</span>
                    <span>3 (Neutral)</span>
                    <span>5 (Highly Delighted)</span>
                  </div>
                </div>

                {/* Complaint Yes/No toggle switch */}
                <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  theme === 'dark' ? 'bg-slate-950/80 border-slate-800/60' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="space-y-1">
                    <span className={`block text-xs font-bold uppercase tracking-wider ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>Active Dispute / Complaint Filed?</span>
                    <span className="block text-[10px] text-slate-500">Check if there is an open support case under review.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      id="complaint-toggle"
                      type="checkbox"
                      checked={formData.complaint}
                      onChange={(e) => updateForm({ complaint: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:transition-all peer-checked:bg-indigo-500 ${
                      theme === 'dark' 
                        ? 'bg-slate-800 border border-slate-700/60 after:bg-slate-300' 
                        : 'bg-slate-200 after:bg-white after:border-slate-300 after:border'
                    }`} />
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Form Controls Footer */}
        <div className={`flex justify-between items-center border-t pt-5 ${borderClass}`}>
          {step > 1 ? (
            <button
              id="wizard-back-btn"
              type="button"
              onClick={prevStep}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                theme === 'dark' 
                  ? 'border-slate-800/60 text-slate-300 hover:bg-slate-900/80' 
                  : 'border-slate-200 text-slate-650 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              id="wizard-next-btn"
              type="button"
              onClick={nextStep}
              className={`px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ml-auto transition-all ${
                theme === 'dark' 
                  ? 'bg-slate-950/80 border-slate-800/60 hover:bg-slate-900/80 text-white' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <span>Next Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="wizard-submit-btn"
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-glass-glow hover:opacity-90 transition-all ml-auto"
            >
              <Brain className="w-4 h-4 animate-pulse" />
              <span>🧠 Analyze Customer Churn</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
