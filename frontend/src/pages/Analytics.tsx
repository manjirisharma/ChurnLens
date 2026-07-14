import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line } from 'recharts';
import { BarChart3, TrendingUp, Info, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


const monthlyChurnTrend = [
  { month: 'Jan', churnRate: 14.2, retentionRate: 85.8 },
  { month: 'Feb', churnRate: 12.8, retentionRate: 87.2 },
  { month: 'Mar', churnRate: 15.6, retentionRate: 84.4 },
  { month: 'Apr', monthNum: 4, churnRate: 11.2, retentionRate: 88.8 },
  { month: 'May', churnRate: 18.4, retentionRate: 81.6 },
  { month: 'Jun', churnRate: 9.6, retentionRate: 90.4 },
];

const paymentModeAnalysis = [
  { mode: 'Credit Card', riskPercentage: 14, count: 280, color: '#6366F1' },
  { mode: 'Debit Card', riskPercentage: 18, count: 240, color: '#06B6D4' },
  { mode: 'UPI', riskPercentage: 8, count: 420, color: '#10B981' },
  { mode: 'E-Wallet', riskPercentage: 32, count: 180, color: '#8B5CF6' },
  { mode: 'COD', riskPercentage: 24, count: 120, color: '#F59E0B' },
];

const categorySatisfaction = [
  { category: 'Laptop & Accs', satisfaction: 4.2, churnProbability: 15 },
  { category: 'Mobile Devices', satisfaction: 3.1, churnProbability: 48 },
  { category: 'Fashion/Wear', satisfaction: 3.8, churnProbability: 25 },
  { category: 'Groceries', satisfaction: 4.5, churnProbability: 8 },
  { category: 'Others', satisfaction: 3.6, churnProbability: 30 },
];

const revenueImpactData = [
  { name: 'Q1 Projected Loss', value: 120000, color: '#EF4444' },
  { name: 'Q1 Revenue Saved', value: 340000, color: '#10B981' },
  { name: 'Potential Recoverable', value: 180000, color: '#F59E0B' },
];

export default function Analytics() {
  const { theme } = useTheme();
  
  const labelColor = theme === 'light' ? '#475569' : '#94a3b8';
  const gridColor = theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const tooltipStyle = theme === 'light' 
    ? { backgroundColor: '#ffffff', borderColor: 'rgba(0,0,0,0.1)', borderRadius: '12px', fontSize: '11px', color: '#0f172a' } 
    : { backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px', color: '#fff' };

  const cardClass = theme === 'dark' 
    ? 'bg-slate-900/40 border-slate-800/60 shadow-glass-glow' 
    : 'bg-white border-slate-200 shadow-sm';
    
  const textTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSubtitle = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const textLabel = theme === 'dark' ? 'text-slate-400' : 'text-slate-700';

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="space-y-1">
        <h1 className={`text-xl font-bold flex items-center gap-1.5 ${textTitle}`}>
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <span>Interactive Predictive Analytics</span>
        </h1>
        <p className={`text-xs ${textSubtitle}`}>Deep-dive multidimensional model evaluations across payment and order category segment streams.</p>
      </div>

      {/* Advisory Alert Banner */}
      <div className={`p-5 rounded-3xl flex gap-3 text-xs ${cardClass}`}>
        <Info className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className={`leading-relaxed ${textSubtitle}`}>
          <span className={`font-extrabold uppercase tracking-wider block mb-1 ${textTitle}`}>Portfolio Sentiment Advisory</span>
          Analytical algorithms detected an inverse correlation between <span className={`font-semibold ${textTitle}`}>E-Wallet transaction frequency</span> and <span className={`font-semibold ${textTitle}`}>tenure lengths</span>. Clients using mobile device login portals with COD payment options are <span className="text-amber-500 font-bold">2.1x more likely</span> to log complaints than Tier-1 metro credit card holders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Monthly Churn Trend vs Retention */}
        <div className={`p-6 rounded-3xl space-y-4 ${cardClass}`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>Monthly Churn & Retention Forecast (%)</h3>
            <p className="text-[11px] text-slate-500 font-medium">Historical active rates compared against model predicted risk thresholds.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyChurnTrend}>
                <XAxis dataKey="month" stroke={labelColor} fontSize={10} tickLine={false} />
                <YAxis stroke={labelColor} fontSize={10} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px', color: labelColor }} />
                <Area type="monotone" dataKey="retentionRate" name="Retention %" stroke="#10B981" fill="rgba(16, 185, 129, 0.08)" strokeWidth={2} />
                <Area type="monotone" dataKey="churnRate" name="Churn %" stroke="#EF4444" fill="rgba(239, 68, 68, 0.08)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment mode churn analysis - Horizontal Bar Chart */}
        <div className={`p-6 rounded-3xl space-y-4 ${cardClass}`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>Payment Channel Risk Profiling</h3>
            <p className="text-[11px] text-slate-500 font-medium">Customer distribution size contrasted with estimated churn risk percentages.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={paymentModeAnalysis} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                <XAxis type="number" stroke={labelColor} fontSize={10} tickLine={false} domain={[0, 40]} />
                <YAxis dataKey="mode" type="category" stroke={labelColor} fontSize={10} tickLine={false} width={80} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="riskPercentage" name="Churn Risk %" radius={[0, 4, 4, 0]} barSize={12}>
                  {paymentModeAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category satisfaction vs churn rate */}
        <div className={`p-6 rounded-3xl space-y-4 lg:col-span-2 ${cardClass}`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>Satisfaction vs Attrition by Catalog</h3>
            <p className="text-[11px] text-slate-500 font-medium">Correlating overall feedback score variables directly to model probability outcomes.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={categorySatisfaction}>
                <XAxis dataKey="category" stroke={labelColor} fontSize={10} tickLine={false} />
                <YAxis stroke={labelColor} fontSize={10} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '11px', color: labelColor }} />
                <Line type="monotone" dataKey="satisfaction" name="Avg Satisfaction (x10)" stroke="#06B6D4" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="churnProbability" name="Churn Probability %" stroke="#EF4444" strokeWidth={2.5} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Revenue Impact */}
        <div className={`p-6 rounded-3xl space-y-4 lg:col-span-1 flex flex-col justify-between ${cardClass}`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${textLabel}`}>Q1 Portfolio Revenue Impact</h3>
            <p className="text-[11px] text-slate-500 font-medium">Financial weight maps derived from retention deployments.</p>
          </div>
          <div className="h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueImpactData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={3} dataKey="value">
                  {revenueImpactData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2">
            {revenueImpactData.map((rev, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: rev.color }} />
                  <span className={textLabel}>{rev.name}</span>
                </div>
                <span className={`font-bold font-mono ${textTitle}`}>${rev.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
