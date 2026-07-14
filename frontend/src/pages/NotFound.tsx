import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-[80px] pointer-events-none" />
        <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white">404</h1>
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Workspace Segment Not Found</h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            The database page or analytical cohort segment you are trying to view cannot be located or is restricted in your administration level.
          </p>
        </div>
        <Link
          id="back-home-404"
          to="/app/dashboard"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 rounded-xl transition-all shadow-glass-glow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
