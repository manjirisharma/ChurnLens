import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Save, User, Shield, Bell, Database, Lock, Settings as SettingsIcon, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [modelThreshold, setModelThreshold] = useState(70);
  const [adminName, setAdminName] = useState("Admin Account");
  const [adminEmail, setAdminEmail] = useState("jiyasaraswat18@gmail.com");
  const [savedStatus, setSavedStatus] = useState(false);
  const { theme } = useTheme();

  const cardClass = theme === 'dark' 
    ? 'bg-slate-900/40 border-slate-800/60 shadow-glass-glow' 
    : 'bg-white border-slate-200 shadow-sm';
    
  const inputClass = `w-full px-3.5 py-2.5 text-xs rounded-xl focus:outline-none transition-colors ${
    theme === 'dark'
      ? 'bg-slate-950/80 border-slate-800/60 text-white focus:border-indigo-500'
      : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-500'
  }`;

  const textTitle = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSubtitle = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const textLabel = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const borderClass = theme === 'dark' ? 'border-slate-800/60' : 'border-slate-200';
  const bgDarkSlate = theme === 'dark' ? 'bg-slate-950/80 border-slate-800/60' : 'bg-slate-50 border-slate-200';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Title block */}
      <div className="space-y-1">
        <h1 className={`text-xl font-bold flex items-center gap-1.5 ${textTitle}`}>
          <SettingsIcon className="w-5 h-5 text-indigo-400" />
          <span>System Settings</span>
        </h1>
        <p className={`text-xs ${textSubtitle}`}>Configure core retention thresholds and administration alert settings.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile Settings */}
        <div className={`p-6 rounded-3xl space-y-4 border transition-all duration-300 ${cardClass}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider border-b pb-2 flex items-center gap-2 ${textSubtitle} ${borderClass}`}>
            <User className="w-4 h-4 text-indigo-400" />
            <span>Retention Officer Profile</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account Display Name</label>
              <input
                id="display-name-settings"
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Email Notification</label>
              <input
                id="email-settings"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Core model calibration threshold slider */}
        <div className={`p-6 rounded-3xl space-y-4 border transition-all duration-300 ${cardClass}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider border-b pb-2 flex items-center gap-2 ${textSubtitle} ${borderClass}`}>
            <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Core Heuristics Calibration</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-400 uppercase tracking-wider">High Risk Intervention Threshold (%)</label>
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl border ${
                theme === 'dark' ? 'text-cyan-400 bg-slate-950/80 border-slate-800/60' : 'text-cyan-600 bg-slate-50 border-slate-200'
              }`}>
                {modelThreshold}%
              </span>
            </div>
            <input
              id="model-threshold-slider"
              type="range"
              min="50"
              max="90"
              value={modelThreshold}
              onChange={(e) => setModelThreshold(Number(e.target.value))}
              className={`w-full accent-indigo-500 h-2 rounded-lg cursor-pointer appearance-none border ${
                theme === 'dark' ? 'bg-slate-950/80 border-slate-800/60' : 'bg-slate-100 border-slate-200'
              }`}
            />
            <p className="text-[10px] text-slate-500 italic leading-relaxed">
              * Note: High risk indicators trigger immediate system alerts and queue automated "Loyalty Voucher Boost" callbacks inside the Diagnostic report outputs.
            </p>
          </div>
        </div>

        {/* Administration Preferences switches */}
        <div className={`p-6 rounded-3xl space-y-4 border transition-all duration-300 ${cardClass}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider border-b pb-2 flex items-center gap-2 ${textSubtitle} ${borderClass}`}>
            <Bell className="w-4 h-4 text-violet-400" />
            <span>Alert & Support Notifications</span>
          </h3>
          <div className="space-y-4">
            {[
              { label: "High-Attrition Risk Alerts", desc: "Notify team immediately when churn probability exceeds the set calibration limit.", check: true },
              { label: "Weekly Diagnostic Trend Digests", desc: "Compile overall diagnostic runs and weekly saved portfolio valuations.", check: false },
              { label: "Database Sync Reports", desc: "Log system operational telemetry alerts to administration accounts.", check: true }
            ].map((pref, i) => (
              <div key={i} className={`flex items-center justify-between text-xs border-b pb-3 last:border-0 last:pb-0 ${theme === 'dark' ? 'border-slate-800/40' : 'border-slate-100'}`}>
                <div className="space-y-1 pr-4">
                  <span className={`block font-bold uppercase tracking-wider text-[11px] ${textTitle}`}>{pref.label}</span>
                  <span className="block text-[10px] text-slate-500 leading-normal">{pref.desc}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" defaultChecked={pref.check} className="sr-only peer" />
                  <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500 border ${
                    theme === 'dark' ? 'bg-[#1e293b]/60 border-slate-800/60' : 'bg-slate-200 border-slate-300'
                  }`} />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-between items-center pt-2">
          {savedStatus ? (
            <span className="text-xs text-emerald-400 font-semibold animate-pulse flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Settings updated successfully!</span>
            </span>
          ) : (
            <div />
          )}
          <button
            id="save-settings-btn"
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-glass-glow hover:opacity-90 transition-all ml-auto"
          >
            <Save className="w-4 h-4" />
            <span>Save Calibration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
