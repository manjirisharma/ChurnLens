import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden relative font-sans transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Dynamic Glow Orbs matching standard UI specifications */}
      <div className={`absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none mix-blend-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-500/2'
      }`} />
      <div className={`absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none mix-blend-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-cyan-400/5' : 'bg-cyan-400/2'
      }`} />

      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Workspace Panel */}
      <div className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950/20' : 'bg-slate-100/10'
      }`}>
        
        {/* Navigation header with profile and notifications */}
        <Navbar setSidebarOpen={setSidebarOpen} />

        {/* Outer content container with native layout margins */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
