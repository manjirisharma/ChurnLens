import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Brain, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  BarChart3, 
  ChevronDown, 
  CheckCircle2, 
  Star, 
  Database, 
  MessageSquare,
  Sun,
  Moon,
  LogOut,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };

  const features = [
    {
      title: "Real-time Attrition Scoring",
      desc: "Instantly process customer demographic data and shopping patterns to determine precise risk metrics.",
      icon: Cpu,
      color: "text-indigo-400"
    },
    {
      title: "Actionable Retention Cards",
      desc: "Receive customized recommendation cards from priority support escalations to targeted cashback vouchers.",
      icon: Brain,
      color: "text-cyan-400"
    },
    {
      title: "Deep Categorical Analytics",
      desc: "Investigate churn variables using responsive multi-axis charting panels for segments and payment modes.",
      icon: BarChart3,
      color: "text-violet-400"
    }
  ];

  const steps = [
    { num: "01", title: "Collect Customer Metrics", desc: "Input demographic data, order history, and satisfaction ratings into our streamlined wizard." },
    { num: "02", title: "AI Diagnostic Analysis", desc: "Machine learning heuristics cross-reference data against active cohort attributes." },
    { num: "03", title: "Remediation Deployment", desc: "Receive targeted coupons, callbacks, or support priorities to prevent churn before it occurs." }
  ];

  const faqs = [
    { q: "How accurate is the ChurnSense AI engine?", a: "The machine learning core yields a 94.8% accuracy rate, calibrated against historical high-frequency e-commerce customer patterns." },
    { q: "Can we integrate this with active CRMs?", a: "Yes, ChurnSense is built with modular web service schemas allowing seamless integration with Salesforce, HubSpot, and custom REST API end-points." },
    { q: "What parameters are critical in prediction?", a: "Customer complaint logs, recent activity gaps (days since last order), satisfaction score gradients, and tenure months prove most statistically significant." }
  ];

  return (
    <div className={`relative min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'}`}>
      
      {/* Landing Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl w-full transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#020617]/75 border-slate-800/60' : 'bg-white/75 border-slate-200/80 shadow-sm'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <span className={`text-base font-bold tracking-tight flex items-center gap-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Churn<span className="text-cyan-500">Sense</span>
            <span className="text-[9px] bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-md font-mono">AI</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            id="landing-theme-toggle"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className={`p-2 rounded-xl transition-all border flex items-center justify-center cursor-pointer ${
              theme === 'dark' 
                ? 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900/60' 
                : 'text-slate-500 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {isAuthenticated ? (
            <>
              {/* If Logged In: Show profile tag and Workspace Link */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs">
                <img src={user?.avatar} alt={user?.name} className="w-5 h-5 rounded-full object-cover border border-indigo-500/30" />
                <span className={`font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{user?.name}</span>
              </div>
              <Link
                id="launch-dashboard-navbar"
                to="/app/dashboard"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                id="landing-logout-btn"
                onClick={logout}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                  theme === 'dark' 
                    ? 'text-red-400 border-slate-800 hover:text-red-300 hover:bg-slate-900/60' 
                    : 'text-red-600 border-slate-200 hover:text-red-700 hover:bg-slate-100'
                }`}
                title="Log Out Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* If Logged Out: Show explicit login path */}
              <Link
                id="navbar-signin-link"
                to="/login"
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  theme === 'dark' 
                    ? 'text-slate-300 border-slate-800 hover:text-white hover:bg-slate-900/60' 
                    : 'text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Sign In
              </Link>
              <Link
                id="launch-dashboard-navbar"
                to="/app/dashboard"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Platform Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main hero */}
      <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto px-6 relative z-10 py-16 md:py-24">
        
        {/* Floating gradient glow orbs */}
        <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full filter blur-[150px] pointer-events-none transition-colors duration-300 ${
          theme === 'dark' ? 'bg-indigo-500/10 mix-blend-screen' : 'bg-indigo-500/5'
        }`} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          {/* Spark Tag */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-slate-900/80 border-slate-800/60 text-cyan-400' 
                : 'bg-indigo-50/80 border-indigo-100/80 text-indigo-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Next-Gen Predictive Customer Intelligence</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Predict Customer Churn <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Before It Happens
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            An enterprise-grade customer retention platform. Harness predictive machine learning heuristics to target churn indices, diagnose risk segments, and deploy personalized recommendation cards instantly.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center pt-2"
          >
            <Link
              id="analyze-customer-hero-btn"
              to="/app/assess"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-bold text-sm hover:opacity-90 shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center gap-2"
            >
              <Brain className="w-4 h-4 animate-bounce" />
              <span>Analyze Customer Risk</span>
            </Link>
            <Link
              id="explore-dashboard-hero-btn"
              to="/app/dashboard"
              className={`px-6 py-3.5 rounded-xl border font-bold text-sm transition-all shadow-sm ${
                theme === 'dark' 
                  ? 'bg-slate-900/80 border-slate-800/60 hover:bg-slate-800/80 text-slate-200' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900'
              }`}
            >
              Explore Dashboard
            </Link>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`mt-16 sm:mt-24 rounded-3xl border p-2 shadow-2xl relative overflow-hidden transition-all duration-300 ${
            theme === 'dark' ? 'border-slate-800/60 bg-slate-900/30' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-2xl pointer-events-none" />
          <div className={`rounded-2xl border p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-center transition-all duration-300 ${
            theme === 'dark' ? 'border-slate-800/40 bg-slate-900/40 backdrop-blur-sm' : 'border-slate-100 bg-slate-50/80'
          }`}>
            
            {/* Visual graphics left */}
            <div className="flex-1 space-y-4 text-left">
              <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">System Analytics</span>
              <h2 className={`text-2xl font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Dynamic Cohort Performance</h2>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Track retention and cohort metrics. Real-time graphs automatically adapt to changes in customers, payments, and satisfaction ratings.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className={`p-3 border rounded-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-slate-900/50 border-slate-800/60' : 'bg-white border-slate-200/80 shadow-sm'
                }`}>
                  <span className="block text-2xl font-black text-cyan-500 font-mono">94.8%</span>
                  <span className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Accuracy Index</span>
                </div>
                <div className={`p-3 border rounded-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-slate-900/50 border-slate-800/60' : 'bg-white border-slate-200/80 shadow-sm'
                }`}>
                  <span className="block text-2xl font-black text-violet-500 font-mono">2.4x</span>
                  <span className={`text-[10px] uppercase font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Retention Gain</span>
                </div>
              </div>
            </div>

            {/* Diagnostic model right */}
            <div className={`flex-1 w-full border rounded-2xl p-5 flex flex-col justify-between min-h-[250px] shadow-lg transition-all duration-300 text-left ${
              theme === 'dark' ? 'bg-slate-950/60 border-slate-800/60' : 'bg-white border-slate-200'
            }`}>
              <div className={`flex justify-between items-center border-b pb-3 ${theme === 'dark' ? 'border-slate-800/60' : 'border-slate-100'}`}>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Active Threat Intervention</span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[9px] bg-red-500/10 text-red-600 border border-red-500/20 font-bold">CRITICAL</span>
              </div>
              <div className="space-y-3 py-6 flex-1 justify-center flex flex-col">
                <div className="flex justify-between items-center text-xs">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Churn Probability Index</span>
                  <span className="text-red-500 font-bold font-mono">91%</span>
                </div>
                <div className={`w-full rounded-full h-3 overflow-hidden border ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800/60' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="bg-gradient-to-r from-purple-500 to-red-500 h-full rounded-full" style={{ width: '91%' }}></div>
                </div>
                <div className={`flex justify-between text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>Standard Cohort base: 35%</span>
                  <span>Threat Status: High Risk Attrition</span>
                </div>
              </div>
              <div className={`text-[11px] font-medium p-2.5 rounded-lg italic text-center border ${
                theme === 'dark' ? 'text-slate-400 bg-slate-900/50 border-slate-800/40' : 'text-slate-600 bg-indigo-50/50 border-indigo-100/50'
              }`}>
                Recommended Action: 📞 Schedule Senior Support Outreach
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="mt-24 space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">Key Capabilities</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Engineered for Customer Success</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className={`p-6 rounded-3xl border backdrop-blur-sm space-y-4 transition-all duration-300 shadow-glass-glow text-left ${
                  theme === 'dark' 
                    ? 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700' 
                    : 'border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg'
                }`}>
                  <div className={`p-3 rounded-xl border w-fit ${
                    theme === 'dark' ? 'bg-slate-900/80 border-slate-800/60' : 'bg-indigo-50 border-indigo-100'
                  } ${feat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className={`text-sm font-bold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{feat.title}</h3>
                    <p className={`text-xs leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24 space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">How It Works</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Streamlined Predictive Pipeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative text-left">
            {steps.map((st, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border relative space-y-4 shadow-glass-glow transition-all duration-300 ${
                theme === 'dark' ? 'border-slate-800/60 bg-slate-900/20' : 'border-slate-200 bg-white hover:shadow-md'
              }`}>
                <span className={`text-3xl font-black font-mono block ${theme === 'dark' ? 'text-indigo-500/10' : 'text-indigo-500/15'}`}>{st.num}</span>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{st.title}</h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-24 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">Help & Resources</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Queries</h2>
          </div>
          <div className="space-y-3 pt-4 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300 ${
                  theme === 'dark' ? 'border-slate-800/60 bg-slate-900/30' : 'border-slate-200 bg-white hover:shadow-sm'
                }`}
              >
                <button
                  id={`faq-btn-${idx}`}
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className={`w-full flex justify-between items-center p-4 text-left text-xs font-semibold transition-all duration-300 ${
                    theme === 'dark' ? 'text-white hover:bg-slate-900/30' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className={`p-4 pt-0 text-xs border-t leading-relaxed transition-all duration-300 ${
                    theme === 'dark' ? 'text-slate-400 border-slate-800/60' : 'text-slate-600 border-slate-100 bg-slate-50/50'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 space-y-4">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-indigo-500 tracking-widest uppercase">Testimonials</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loved by Retention Experts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left">
            <div className={`p-6 rounded-3xl border backdrop-blur-sm space-y-4 shadow-glass-glow transition-all duration-300 ${
              theme === 'dark' ? 'border-slate-800/60 bg-slate-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className={`text-xs leading-relaxed italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                "We were losing high-value accounts without understanding the trigger mechanisms. ChurnSense's recommendation cards let us run proactive outreaches automatically, cutting attrition by 34%."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-xs shrink-0">
                  MK
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Marcus Vance</h4>
                  <span className={`text-[10px] uppercase font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Director of Retention, ScaleUp Inc</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-3xl border backdrop-blur-sm space-y-4 shadow-glass-glow transition-all duration-300 ${
              theme === 'dark' ? 'border-slate-800/60 bg-slate-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className={`text-xs leading-relaxed italic ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                "The circular confidence scoring visualizer makes it incredibly easy for non-technical account managers to action retention recommendations on the fly. It is a game-changer."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-xs shrink-0">
                  SL
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Sarah Jenkins</h4>
                  <span className={`text-[10px] uppercase font-semibold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>VP of Customer Success, SaaSify</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className={`mt-auto border-t py-8 px-6 text-center text-xs font-medium transition-all duration-300 ${
        theme === 'dark' ? 'border-slate-800/60 bg-[#020617] text-slate-500' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-indigo-500" />
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>ChurnSense AI</span>
          </div>
          <div className="flex gap-6 text-[11px]">
            <Link to="/app/dashboard" className={`hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Launch App</Link>
            <a href="#" className={`hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Privacy Charter</a>
            <a href="#" className={`hover:text-indigo-500 transition-colors ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Terms of Services</a>
          </div>
          <div className="font-mono text-[10px] text-slate-400">
            Node: Production Server Operational
          </div>
        </div>
      </footer>
    </div>
  );
}
