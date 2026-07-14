import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { useChurn } from '../context/ChurnContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { ShieldAlert, Users, TrendingUp, Sparkles, Brain, ArrowUpRight, CheckCircle2, DollarSign, Activity, Settings, HelpCircle } from 'lucide-react';

const analyticsChartData = [
  { name: 'Jan', active: 380, churn: 12 },
  { name: 'Feb', active: 410, churn: 8 },
  { name: 'Mar', active: 490, churn: 19 },
  { name: 'Apr', active: 520, churn: 15 },
  { name: 'May', active: 580, churn: 22 },
  { name: 'Jun', active: 640, churn: 11 },
];

const segmentData = [
  { name: 'Laptops', value: 340, color: '#6366F1' },
  { name: 'Mobile', value: 210, color: '#06B6D4' },
  { name: 'Fashion', value: 180, color: '#8B5CF6' },
  { name: 'Grocery', value: 120, color: '#10B981' },
  { name: 'Others', value: 60, color: '#F59E0B' },
];

export default function Dashboard() {
  const { history } = useChurn();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Dynamic values calculation from real context data
  const totalInferences = history.length;
  const highRiskCount = history.filter(item => item.riskLevel === 'High').length;
  const avgSatisfaction = history.length > 0
    ? (history.reduce((sum, item) => sum + item.satisfaction, 0) / history.length).toFixed(1)
    : "0.0";

  // Total active accounts is simulated but responds to our test logs
  const totalSimulatedCustomers = 1240 + totalInferences;
  const simulatedRetentionRate = (92.4 - (highRiskCount * 0.15)).toFixed(1);

  // Risk segments distribution
  const riskDistribution = [
    { name: 'High Risk', value: history.filter(i => i.riskLevel === 'High').length || 2, color: '#EF4444' },
    { name: 'Medium Risk', value: history.filter(i => i.riskLevel === 'Medium').length || 3, color: '#F59E0B' },
    { name: 'Low Risk', value: history.filter(i => i.riskLevel === 'Low').length || 5, color: '#22C55E' },
  ];

  // Theme-aware Recharts configurations
  const labelColor = theme === 'light' ? '#475569' : '#94a3b8';
  const gridColor = theme === 'light' ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  const tooltipStyle = theme === 'light' 
    ? { backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', fontSize: '11px', color: '#0f172a' } 
    : { backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '12px', fontSize: '11px', color: '#fff' };

  return (
    <div className="space-y-6">
      
      {/* Welcome header with sparkles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Welcome Back, Retention Administrator <Sparkles className="w-5 h-5 text-indigo-500" />
          </h1>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>Deploy proactive model interventions to secure your customer portfolio.</p>
        </div>
        <Link
          id="portal-assess-btn"
          to="/app/assess"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white text-xs font-bold hover:opacity-90 flex items-center gap-2 shadow-glass-glow self-start transition-all"
        >
          <Brain className="w-4 h-4 animate-pulse" />
          <span>New Customer Diagnosis</span>
        </Link>
      </div>

      {/* Grid statistics summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: "Portfolio Total", value: totalSimulatedCustomers, desc: "Active subscriber base", icon: Users, color: "text-indigo-500" },
          { title: "Risk Inferences", value: totalInferences, desc: "Scored diagnostics log", icon: Brain, color: "text-cyan-500" },
          { title: "High Attrition Risk", value: highRiskCount, desc: "Immediate priority", icon: ShieldAlert, color: "text-red-500" },
          { title: "Retention Quotient", value: `${simulatedRetentionRate}%`, desc: "+0.8% versus month base", icon: TrendingUp, color: "text-emerald-500" },
          { title: "Saved Revenue", value: `$${(totalInferences * 450).toLocaleString()}`, desc: "From proactive interventions", icon: DollarSign, color: "text-indigo-500" }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-4.5 rounded-2xl flex items-center justify-between relative overflow-hidden transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow hover:border-slate-700/80'
                : 'bg-white border border-slate-200/80 shadow-sm hover:border-slate-300'
            }`}>
              <div className="space-y-1">
                <span className={`text-[10px] font-bold uppercase tracking-wide ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>{stat.title}</span>
                <span className={`block text-xl font-black font-mono ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{stat.value}</span>
                <span className={`block text-[10px] ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>{stat.desc}</span>
              </div>
              <div className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                theme === 'dark'
                  ? 'bg-slate-950/80 border-slate-800/60'
                  : 'bg-slate-50 border-slate-200'
              } ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Core risk distribution pie chart */}
        <div className={`p-6 rounded-3xl space-y-4 lg:col-span-1 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow'
            : 'bg-white border border-slate-200/80 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>Risk Segmentation</h3>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
            }`}>Heuristic attrition index split of recent runs.</p>
          </div>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 pt-2">
            {riskDistribution.map((r, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                  <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{r.name}</span>
                </div>
                <span className={`font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{r.value} clients</span>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast Area line chart */}
        <div className={`p-6 rounded-3xl space-y-4 lg:col-span-2 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow'
            : 'bg-white border border-slate-200/80 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>Active Subscribers Trend</h3>
              <p className={`text-[11px] ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
              }`}>Monthly subscriber base mapping versus resolved threats.</p>
            </div>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2 py-0.5 rounded-full border border-indigo-500/20">Synced</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsChartData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke={labelColor} fontSize={10} tickLine={false} />
                <YAxis stroke={labelColor} fontSize={10} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="active" stroke="#6366F1" fillOpacity={1} fill="url(#colorActive)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Segment Distribution bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer segments */}
        <div className={`p-6 rounded-3xl space-y-4 lg:col-span-2 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow'
            : 'bg-white border border-slate-200/80 shadow-sm'
        }`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>Preference Categories Matrix</h3>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
            }`}>Client concentration distribution across shopping sectors.</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <XAxis dataKey="name" stroke={labelColor} fontSize={10} tickLine={false} />
                <YAxis stroke={labelColor} fontSize={10} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights & Quick Actions */}
        <div className="space-y-6 lg:col-span-1">
          
          {/* AI Insights */}
          <div className={`border p-6 rounded-3xl space-y-3.5 shadow-2xl relative overflow-hidden transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-950/25 to-cyan-950/25 border-slate-800/60 shadow-glass-glow text-slate-300'
              : 'bg-gradient-to-br from-indigo-50/50 to-cyan-50/50 border-slate-200 text-slate-700'
          }`}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-[20px]" />
            <div className="flex items-center gap-2 text-indigo-500">
              <Sparkles className="w-4 h-4 animate-bounce" />
              <h4 className="text-xs font-bold uppercase tracking-widest">AI Retention Insights</h4>
            </div>
            <div className="space-y-3 text-xs leading-relaxed">
              <p>
                <span className={`font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Critical Trigger Identified:</span> Clients who log a complaint coupled with a satisfaction score of 1 or 2 represent a <span className="text-red-500 font-bold">91% attrition probability</span>.
              </p>
              <p>
                <span className={`font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Remediation Boost:</span> Resolving support disputes within 12 hours yields a <span className="text-emerald-500 font-bold">2.4x retention multiplier</span> across the Tier-1 demographic.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`p-6 rounded-3xl space-y-3 transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow'
              : 'bg-white border border-slate-200/80 shadow-sm'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>Workspace Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                id="qa-assess-btn"
                onClick={() => navigate('/app/assess')}
                className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800/60 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <Brain className="w-4 h-4 mx-auto text-indigo-500" />
                <span className="block text-[10px] font-bold uppercase tracking-wider">Run Wizard</span>
              </button>
              <button
                id="qa-analytics-btn"
                onClick={() => navigate('/app/analytics')}
                className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800/60 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 mx-auto text-cyan-500" />
                <span className="block text-[10px] font-bold uppercase tracking-wider">Analytics</span>
              </button>
              <button
                id="qa-history-btn"
                onClick={() => navigate('/app/history')}
                className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800/60 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4 mx-auto text-purple-500" />
                <span className="block text-[10px] font-bold uppercase tracking-wider">History Log</span>
              </button>
              <button
                id="qa-settings-btn"
                onClick={() => navigate('/app/settings')}
                className={`p-3 rounded-xl border text-center space-y-1.5 transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-950 border-slate-800/60 text-slate-300 hover:bg-slate-900/80 hover:border-slate-700 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 mx-auto text-amber-500" />
                <span className="block text-[10px] font-bold uppercase tracking-wider">Configure</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Recent Predictions logs */}
      <div className={`p-6 rounded-3xl space-y-4 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/40 border border-slate-800/60 shadow-glass-glow'
          : 'bg-white border border-slate-200/80 shadow-sm'
      }`}>
        <div className={`flex justify-between items-center border-b pb-3 ${
          theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200'
        }`}>
          <div>
            <h3 className={`text-xs font-bold uppercase tracking-wider ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>Diagnostic Threat Feed</h3>
            <p className={`text-[11px] ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
            }`}>Live operational data streams from active diagnosis instances.</p>
          </div>
          <Link
            id="full-history-view-btn"
            to="/app/history"
            className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold flex items-center gap-1.5"
          >
            <span>Complete Log History</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b font-semibold ${
                theme === 'dark' ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-400'
              }`}>
                <th className="py-2.5">Diagnostic Code</th>
                <th>Client</th>
                <th>Satisfaction</th>
                <th>Complaint Status</th>
                <th>Inference Score</th>
                <th>Remediation Severity</th>
              </tr>
            </thead>
            <tbody>
              {history.slice(0, 4).map((record, index) => (
                <tr key={index} className={`border-b transition-colors ${
                  theme === 'dark' 
                    ? 'border-slate-800/40 text-slate-300 hover:bg-slate-900/10' 
                    : 'border-slate-100 text-slate-650 hover:bg-slate-50/80'
                }`}>
                  <td className="py-3.5 font-mono font-bold text-cyan-500">{record.id}</td>
                  <td className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{record.customerName}</td>
                  <td>{record.satisfaction} / 5</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.complaint 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                        : theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {record.complaint ? 'Yes (Logged)' : 'No'}
                    </span>
                  </td>
                  <td className={`font-mono font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>{record.probability}%</td>
                  <td>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      record.riskLevel === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      record.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    }`}>
                      {record.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
