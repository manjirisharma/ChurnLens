import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function MainLayout() {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-800'} antialiased overflow-x-hidden relative font-sans transition-colors duration-300`}>
      {/* Mesh Background Blobs */}
      <div className={`absolute top-[10%] left-[20%] w-[600px] h-[600px] rounded-full filter blur-[150px] pointer-events-none transition-colors duration-300 ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-500/3'}`} />
      <div className={`absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full filter blur-[120px] pointer-events-none transition-colors duration-300 ${theme === 'dark' ? 'bg-cyan-400/5' : 'bg-cyan-400/3'}`} />
      
      {/* Render matching public children */}
      <Outlet />
    </div>
  );
}
