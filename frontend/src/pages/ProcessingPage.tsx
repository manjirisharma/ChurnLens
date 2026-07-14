import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

const steps = [
  { id: 0, label: "Reading Customer Profile Metadata" },
  { id: 1, label: "Evaluating Shopping & Transaction Patterns" },
  { id: 2, label: "Analysing Satisfaction Rating Gradients" },
  { id: 3, label: "Detecting Dynamic Churn Risk Variables" },
  { id: 4, label: "Calculating Confidence Weights & Risk Levels" },
  { id: 5, label: "Structuring Personalized Support Recommendations" }
];

export default function ProcessingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Increment ticks
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Increment percentage bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 2;
        } else {
          clearInterval(progressInterval);
          navigate('/app/result');
          return 100;
        }
      });
    }, 55);

    return () => clearInterval(progressInterval);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto py-12 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 relative">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-indigo-500/10 filter blur-[80px] pointer-events-none" />

      {/* Pulsing visual core */}
      <div className="relative">
        <div className="w-20 h-20 bg-slate-900/40 border border-slate-800/60 rounded-3xl flex items-center justify-center text-indigo-400 shadow-glass-glow animate-pulse">
          <Brain className="w-10 h-10" />
        </div>
        <Loader2 className="w-6 h-6 text-cyan-400 animate-spin absolute -bottom-1.5 -right-1.5 bg-slate-950 p-0.5 rounded-full border border-slate-800/60" />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <span>ChurnSense Engine Active</span>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-bounce" />
        </h2>
        <p className="text-xs text-slate-400">Evaluating predictive metrics against active ML models...</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm space-y-1.5">
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800/60">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <span>Calibration progress</span>
          <span>{progress}% Complete</span>
        </div>
      </div>

      {/* Tick checklist */}
      <div className="w-full glass-panel p-6 rounded-3xl text-left text-xs max-w-sm border border-slate-800/60 space-y-3.5 shadow-xl bg-slate-900/40 shadow-glass-glow">
        {steps.map((item, idx) => {
          const isCompleted = currentIndex > idx;
          const isActive = currentIndex === idx;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isCompleted || isActive ? 'opacity-100' : 'opacity-20'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              ) : isActive ? (
                <Loader2 className="w-4.5 h-4.5 text-indigo-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4.5 h-4.5 rounded-full border border-slate-800 shrink-0" />
              )}
              <span className={`font-medium ${isActive ? 'text-white font-bold' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
