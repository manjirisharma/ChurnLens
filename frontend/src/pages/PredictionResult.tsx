import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChurn } from '../context/ChurnContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { ShieldAlert, LayoutDashboard, RefreshCw, Sparkles, Download, CheckCircle2, ChevronRight, HelpCircle, ShieldQuestion, ArrowDown, Award, TrendingUp } from 'lucide-react';

export default function PredictionResult() {
  const { predictionResult, resetForm } = useChurn();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const cardClass = theme === 'dark' 
    ? 'bg-slate-900/40 border-slate-800/60 shadow-glass-glow' 
    : 'bg-white border-slate-200 shadow-sm';
    
  const textTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSubtitle = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const textLabel = theme === 'dark' ? 'text-slate-400' : 'text-slate-700';
  const borderClass = theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200';
  const bgDarkSlate = theme === 'dark' ? 'bg-slate-950/40 border-slate-800/60' : 'bg-slate-50 border-slate-200';

  if (!predictionResult) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-slate-500 mx-auto border ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <ShieldQuestion className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className={`text-sm font-bold ${textTitle}`}>No active prediction report found</h3>
          <p className={`text-xs ${textSubtitle}`}>Run an assessment diagnostics session first to populate this page.</p>
        </div>
        <button
          onClick={() => navigate('/app/assess')}
          className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all"
        >
          Open Assessment Portal
        </button>
      </div>
    );
  }

  const { id, customerName, isLikelyToChurn, probability, riskLevel, timestamp, inputData, recommendations } = predictionResult;

  const handlePredictAnother = () => {
    resetForm();
    navigate('/app/assess');
  };

  const handlePrint = () => {
    window.print();
  };

  // Dynamic Churn Drivers Factor Chart Weight Calculation
  const calculateTopFactors = () => {
    const factors = [];
    
    // 1. Complaint factor
    if (inputData.complaint) {
      factors.push({ name: 'Customer Complaint Logged', value: 28, color: '#f87171' });
    } else {
      factors.push({ name: 'Customer Complaint Resolved/None', value: 3, color: '#34d399' });
    }
    
    // 2. Satisfaction factor
    const sat = Number(inputData.customerSatisfaction);
    if (sat <= 2) {
      factors.push({ name: 'Satisfaction Score (Low)', value: sat === 1 ? 26 : 20, color: '#f87171' });
    } else if (sat === 3) {
      factors.push({ name: 'Satisfaction Score (Neutral)', value: 12, color: '#fbbf24' });
    } else {
      factors.push({ name: 'Satisfaction Score (High)', value: 4, color: '#34d399' });
    }
    
    // 3. Tenure factor
    const tenureNum = Number(inputData.tenure) || 0;
    if (tenureNum < 6) {
      factors.push({ name: 'Account Tenure (Low)', value: 22, color: '#f87171' });
    } else if (tenureNum < 12) {
      factors.push({ name: 'Account Tenure (Medium)', value: 12, color: '#fbbf24' });
    } else {
      factors.push({ name: 'Account Tenure (High)', value: 5, color: '#34d399' });
    }
    
    // 4. Days since last order
    const days = Number(inputData.daysSinceLastOrder) || 0;
    if (days > 12) {
      factors.push({ name: 'Days Since Last Order (High Inactivity)', value: 24, color: '#f87171' });
    } else if (days > 6) {
      factors.push({ name: 'Days Since Last Order (Medium Inactivity)', value: 14, color: '#fbbf24' });
    } else {
      factors.push({ name: 'Days Since Last Order (Fresh Inactivity)', value: 6, color: '#34d399' });
    }
    
    // 5. Order Count
    const orders = Number(inputData.orderCount) || 0;
    if (orders < 3) {
      factors.push({ name: 'Order Volume (Low Engagement)', value: 16, color: '#f87171' });
    } else if (orders < 8) {
      factors.push({ name: 'Order Volume (Medium)', value: 10, color: '#fbbf24' });
    } else {
      factors.push({ name: 'Order Volume (High)', value: 4, color: '#34d399' });
    }

    // Sort factors descending by risk percentage
    const sorted = factors.sort((a, b) => b.value - a.value).slice(0, 5);
    
    // Calculate a balanced remainder for "Other Contributing Factors"
    const sum = sorted.reduce((acc, curr) => acc + curr.value, 0);
    const otherVal = Math.max(6, Math.min(25, 100 - sum - (isLikelyToChurn ? 10 : 35)));
    sorted.push({ name: 'Other Systemic Factors', value: otherVal, color: '#64748b' });
    
    return sorted;
  };

  const topFactors = calculateTopFactors();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header Meta Actions */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4 ${borderClass}`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className={`text-lg font-black uppercase tracking-wider ${textTitle}`}>Predictive Intelligence Report</h1>
            <span className="px-2 py-0.5 rounded text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono font-bold">REPORT GENERATED</span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">Report ID: {id} | Synced on: {timestamp}</p>
        </div>
        <button
          id="print-report-btn"
          onClick={handlePrint}
          className={`px-3.5 py-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all self-start ${
            theme === 'dark' 
              ? 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/80 text-slate-400 hover:text-white' 
              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 shadow-sm'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save PDF Report</span>
        </button>
      </div>

      {/* Main Grid: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Diagnostics Summary & Actions (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hero Prediction Summary */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 rounded-3xl relative overflow-hidden transition-all duration-300 ${cardClass}`}>
            <div className="md:col-span-2 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Core Model Hypothesis</span>
              <h2 className="text-2xl font-black leading-tight">
                Customer is{' '}
                {isLikelyToChurn ? (
                  <span className="text-red-500">Likely to Churn</span>
                ) : (
                  <span className="text-emerald-500">Not Likely to Churn</span>
                )}
              </h2>
              <p className={`text-xs leading-relaxed ${textSubtitle}`}>
                Based on active demographics and behavioral metrics, our predictive heuristics indicate a risk index category classified as{' '}
                <span className={`font-extrabold ${textTitle}`}>{riskLevel} Attrition Risk</span>. Proactive outreach strategies are recommended to mitigate client churn.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Intervention Status:</span>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  riskLevel === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                  riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}>
                  {riskLevel} Risk Severity
                </span>
              </div>
            </div>

            {/* Circular SVG confidence gauge */}
            <div className={`flex flex-col items-center justify-center p-4 rounded-2xl relative overflow-hidden self-stretch border ${bgDarkSlate}`}>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke={theme === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'rgba(15, 23, 42, 0.08)'} strokeWidth="7" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={isLikelyToChurn ? "#EF4444" : "#10B981"}
                    strokeWidth="7"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - probability / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-xl font-black font-mono ${textTitle}`}>{probability}%</span>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest font-bold">Probability</span>
                </div>
              </div>
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mt-2">Confidence Score</span>
            </div>
          </div>

          {/* Actionable Retention Cards */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>
              Proactive Retention Remediations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4.5 rounded-2xl flex gap-3.5 items-start hover:border-indigo-500/30 transition-all group ${cardClass}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 border ${
                    theme === 'dark' ? 'bg-slate-950/60 border-slate-800/60' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {rec.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold group-hover:text-indigo-500 transition-colors ${textTitle}`}>{rec.title}</h4>
                    <p className={`text-[11px] leading-relaxed ${textSubtitle}`}>{rec.desc}</p>
                    <div className="flex items-center gap-1 text-[10px] text-indigo-500 hover:text-indigo-600 font-bold uppercase tracking-wider pt-1 cursor-pointer">
                      <span>{rec.actionLabel}</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Customer Insights & Factor Chart (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Customer Insights Parent Panel */}
          <div className={`p-6 rounded-3xl space-y-6 transition-all duration-300 ${cardClass}`}>
            
            {/* Top Factors Influencing Churn */}
            <div className="space-y-4">
              <div className={`flex items-center justify-between border-b pb-2.5 ${borderClass}`}>
                <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${textLabel}`}>
                  <TrendingUp className="w-4 h-4 text-cyan-500" />
                  <span>Top Factors Influencing Churn</span>
                </h3>
                <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help" title="These represent the heaviest contributing risk factors calculated by our heuristics engine." />
              </div>

              {/* Horizontal Bar Chart (Custom Progress Style matching mockup perfectly) */}
              <div className="space-y-3.5">
                {topFactors.map((factor, index) => (
                  <div key={index} className="space-y-1">
                    <div className={`flex justify-between text-[11px] font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                      <span className="truncate pr-4">{factor.name}</span>
                      <span className={`font-bold font-mono shrink-0 ${textTitle}`}>{factor.value}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden border ${theme === 'dark' ? 'bg-slate-950/60 border-slate-800/40' : 'bg-slate-100 border-slate-200/60'}`}>
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${factor.value}%`, 
                          backgroundColor: factor.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Diagnostic Input Summary */}
            <div className="space-y-4 pt-2">
              <h3 className={`text-xs font-bold uppercase tracking-wider border-b pb-2.5 ${textLabel} ${borderClass}`}>
                Input Diagnostic Summary
              </h3>
              <div className="grid grid-cols-2 gap-3.5 text-xs max-h-96 overflow-y-auto pr-1">
                {[
                  { label: "Customer Name", val: customerName },
                  { label: "Gender Profile", val: inputData.gender || "Not Specified" },
                  { label: "Marital Status", val: inputData.maritalStatus || "Not Specified" },
                  { label: "Classification", val: `City Tier ${inputData.cityTier}` },
                  { label: "Account Tenure", val: `${inputData.tenure} Months` },
                  { label: "Login Portal", val: inputData.preferredLoginDevice || "Not Selected" },
                  { label: "Payment Channel", val: inputData.preferredPaymentMode || "Not Selected" },
                  { label: "Weekly Browsing", val: `${inputData.hoursSpent} Hours` },
                  { label: "Devices Logged", val: `${inputData.registeredDevices} Registered` },
                  { label: "Saved Locations", val: `${inputData.noOfAddresses} Addresses` },
                  { label: "Preferred Catalog", val: inputData.preferredOrderCategory || "Not Selected" },
                  { label: "Order Volume", val: `${inputData.orderCount} Orders` },
                  { label: "Promo Coupons", val: `${inputData.couponUsed} Used` },
                  { label: "Cashback Reward", val: `$${inputData.cashbackAmount}` },
                  { label: "Inactivity Gaps", val: `${inputData.daysSinceLastOrder} Days` },
                  { label: "Value Hike Indicator", val: `${inputData.orderAmountHike}%` },
                  { label: "Hub-Home Distance", val: `${inputData.warehouseToHome} km` },
                  { label: "Satisfaction", val: `${inputData.customerSatisfaction} / 5 Score` },
                  { label: "Complaint logged", val: inputData.complaint ? "Yes" : "No" }
                ].map((item, i) => (
                  <div key={i} className={`p-2.5 border rounded-xl space-y-0.5 ${
                    theme === 'dark' ? 'bg-slate-950/40 border-slate-800/40' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-bold">{item.label}</span>
                    <span className={`block font-bold font-mono text-[10px] truncate ${textTitle}`}>{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Footer trigger controls */}
      <div className={`flex flex-wrap gap-4 pt-4 border-t justify-end items-center ${borderClass}`}>
        <button
          id="back-to-dashboard-btn"
          onClick={() => navigate('/app/dashboard')}
          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
            theme === 'dark' 
              ? 'border-slate-800/60 text-slate-300 hover:bg-slate-900/80' 
              : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50 shadow-sm'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard Main</span>
        </button>
        <button
          id="predict-another-btn"
          onClick={handlePredictAnother}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-glass-glow hover:opacity-90 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Run Another Diagnosis</span>
        </button>
      </div>

    </div>
  );
}
