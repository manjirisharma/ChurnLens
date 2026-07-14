import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, LayoutDashboard, BarChart3, Clock, Settings, X, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Analyze Customer', path: '/app/assess', icon: Brain },
  { name: 'Deep Analytics', path: '/app/analytics', icon: BarChart3 },
  { name: 'History Logs', path: '/app/history', icon: Clock },
  { name: 'Settings', path: '/app/settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/80 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 border-r transition-all duration-300 transform md:translate-x-0 md:static md:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          theme === 'dark' 
            ? 'bg-[#020617] border-slate-800/60' 
            : 'bg-white border-slate-200/80 shadow-sm'
        }`}
      >
        {/* Branding */}
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <span className={`font-bold text-lg tracking-tight flex items-center gap-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              ChurnSense<span className="text-cyan-500">AI</span>
            </span>
          </div>
          <button
            id="close-sidebar-btn"
            onClick={() => setIsOpen(false)}
            className={`p-1 rounded-lg transition-colors md:hidden ${
              theme === 'dark' ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-indigo-600/10 text-indigo-500 border-indigo-500/20 font-semibold'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:bg-slate-900/50 border-transparent hover:text-slate-200'
                      : 'text-slate-600 hover:bg-slate-100/70 border-transparent hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Status */}
        <div className="mt-auto p-4 mb-4">
          <div className={`border rounded-2xl p-4 transition-all duration-300 ${
            theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>System Status</span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>AI Model v4.2 is training on 2.4M new records.</p>
          </div>
          <div className={`text-center text-[10px] font-mono mt-3 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
            © 2026 ChurnSense AI Ltd.
          </div>
        </div>
      </div>
    </>
  );
}
