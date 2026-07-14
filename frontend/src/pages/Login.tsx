import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { 
  Brain, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  AlertCircle,
  Shield,
  Loader2
} from 'lucide-react';

const DEMO_PROFILES = [
  {
    role: 'Retention Officer',
    email: 'marcus.vance@churnsense.ai',
    name: 'Marcus Vance',
    desc: 'High-frequency queue analysis'
  },
  {
    role: 'VP of Customer Success',
    email: 'sarah.jenkins@saasify.com',
    name: 'Sarah Jenkins',
    desc: 'Strategic cohort retention'
  },
  {
    role: 'Support Lead',
    email: 'clara.support@churnsense.ai',
    name: 'Clara Oswald',
    desc: 'Priority ticket intervention'
  }
];

export default function Login() {
  const { login, signup, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Retention Officer');
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine redirection target
  const from = location.state?.from?.pathname || '/app/dashboard';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your corporate email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please provide a valid email format (e.g., name@domain.com).');
      return;
    }

    if (password.length < 6) {
      setError('Security credentials must contain at least 6 characters.');
      return;
    }

    if (isSignUp && !name) {
      setError('Please enter your full name to generate your diagnostic profile.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(name, email, role);
      } else {
        await login(email, role);
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError('Authentication failed. Please verify credentials or try another method.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSelect = async (profile: typeof DEMO_PROFILES[0]) => {
    setEmail(profile.email);
    setPassword('demopass123');
    setName(profile.name);
    setRole(profile.role);
    setError('');
    setIsSubmitting(true);
    try {
      // Perform instant login for seamless testing experience
      await login(profile.email, profile.role);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Instant demo login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#020617]' : 'bg-slate-50'
    }`}>
      
      {/* Background Mesh Glow */}
      <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-300 ${
        theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-500/4'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full filter blur-[120px] pointer-events-none transition-all duration-300 ${
        theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-500/4'
      }`} />

      {/* Main Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Side: Brand Marketing & Pitch Panel (7 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pr-8 text-left order-first lg:order-first">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <span className={`text-xl font-bold tracking-tight flex items-center gap-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Churn<span className="text-cyan-500">Sense</span>
              <span className="text-xs bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-md font-mono">AI</span>
            </span>
          </div>

          <div className="space-y-3">
            <span className={`text-[10px] uppercase font-extrabold tracking-widest ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              Secure Portal Access
            </span>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight leading-[1.15] ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Harness Predictive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
                Retention Intelligence
              </span>
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-md ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Gain access to automated customer diagnostics, real-time cohort tracking graphs, and adaptive mitigation cards validated by machine learning.
            </p>
          </div>

          {/* Quick Demo Credentials Panel */}
          <div className="space-y-3 pt-2">
            <span className={`text-[10px] uppercase font-bold tracking-wider block ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              Speed Dial Demo Roles (Click to Login Instantly)
            </span>
            <div className="space-y-2.5 max-w-md">
              {DEMO_PROFILES.map((profile, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDemoSelect(profile)}
                  className={`w-full p-3 border rounded-2xl flex items-center justify-between text-left transition-all hover:translate-x-1 hover:shadow-sm cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-900/80 hover:border-indigo-500/30'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-indigo-300'
                  } ${email === profile.email ? (theme === 'dark' ? 'border-indigo-500 bg-slate-900/80' : 'border-indigo-500 bg-indigo-50/40') : ''}`}
                >
                  <div className="space-y-0.5">
                    <span className={`text-[11px] font-bold block ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      {profile.name}
                    </span>
                    <span className={`text-[10px] font-medium block ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {profile.role} • <span className="font-mono text-[9px]">{profile.desc}</span>
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${email === profile.email ? 'text-indigo-400 translate-x-1' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Authentication Form (5 Cols) */}
        <div className="lg:col-span-6 flex items-center justify-center order-last lg:order-last">
          <div className={`w-full max-w-md border p-6 sm:p-8 rounded-3xl shadow-xl transition-all duration-300 ${
            theme === 'dark' ? 'bg-[#0c101f]/80 border-slate-800/60' : 'bg-white border-slate-200'
          }`}>
            
            {/* Tab switch control */}
            <div className={`grid grid-cols-2 p-1 rounded-xl mb-6 ${
              theme === 'dark' ? 'bg-slate-950/80 border border-slate-850' : 'bg-slate-100'
            }`}>
              <button
                type="button"
                onClick={() => { setIsSignUp(false); setError(''); }}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isSignUp
                    ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-sm')
                    : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(''); }}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isSignUp
                    ? (theme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-sm')
                    : (theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              
              {/* Alert Feedback */}
              {error && (
                <div className="p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 flex items-start gap-2.5 text-[11px] leading-relaxed">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name Input - SignUp Only */}
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className={`block text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                        theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className={`block text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="name@churnsense.ai"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className={`block text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                    Security Credentials
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setError("Demo reset initiated. Credentials default to 'demopass123' for fast entry.")}
                      className="text-[10px] text-indigo-500 hover:underline font-semibold"
                    >
                      Forgot Credentials?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Role Select Input */}
              <div className="space-y-1.5">
                <label className={`block text-[10px] uppercase font-bold tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Operational Assignment
                </label>
                <div className="relative">
                  <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer ${
                      theme === 'dark' ? 'bg-slate-900/60 border-slate-800/80 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Retention Officer">Retention Officer</option>
                    <option value="VP of Customer Success">VP of Customer Success</option>
                    <option value="Support Lead">Support Lead</option>
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="System Administrator">System Administrator</option>
                  </select>
                </div>
              </div>

              {/* Security policy note */}
              <div className="flex items-center gap-2 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className={`text-[10px] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  Secure HTTPS tunnel & TLS 1.3 encryption active
                </span>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md hover:shadow-lg hover:shadow-indigo-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Session...</span>
                  </>
                ) : (
                  <>
                    <span>{isSignUp ? 'Establish Diagnostic Profile' : 'Access Analytics Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/" 
                className={`text-[11px] font-semibold hover:underline ${
                  theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                ← Back to Marketing Site
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
