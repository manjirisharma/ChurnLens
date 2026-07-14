import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Bell, User, ChevronDown, Sparkles, ShieldCheck, LogOut, Settings, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ setSidebarOpen }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbChild = () => {
    const path = location.pathname;
    if (path.includes('/app/dashboard')) return 'Overview';
    if (path.includes('/app/assess')) return 'Customer Assessment';
    if (path.includes('/app/processing')) return 'Processing Engine';
    if (path.includes('/app/result')) return 'Prediction Result';
    if (path.includes('/app/analytics')) return 'Analytics';
    if (path.includes('/app/history')) return 'History Log';
    if (path.includes('/app/settings')) return 'Settings';
    return 'Portal';
  };

  const child = getBreadcrumbChild();

  const mockNotifications = [
    { id: 1, text: "High churn probability (91%) detected for customer assessment.", time: "10 mins ago", unread: true },
    { id: 2, text: "Retention campaign 'Offer Promotional Cashback' successfully launched.", time: "1 hour ago", unread: false },
    { id: 3, text: "Platform operational database synced successfully.", time: "1 day ago", unread: false }
  ];

  return (
    <header className={`sticky top-0 z-30 flex items-center justify-between h-16 px-8 border-b transition-all duration-300 backdrop-blur-md ${
      theme === 'dark'
        ? 'border-slate-800/60 bg-[#020617]/50 text-slate-100'
        : 'border-slate-200/80 bg-white/65 text-slate-800 shadow-sm'
    }`}>
      {/* Left side actions */}
      <div className="flex items-center gap-4">
        <button
          id="menu-toggle-btn"
          onClick={() => setSidebarOpen(true)}
          className={`p-2 rounded-xl transition-all md:hidden ${
            theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
          Dashboard / <span className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-900 font-semibold'}`}>{child}</span>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className={`p-2 rounded-xl transition-all border border-transparent flex items-center justify-center cursor-pointer ${
            theme === 'dark'
              ? 'text-slate-400 hover:text-white hover:bg-slate-900/60 hover:border-slate-800'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200'
          }`}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </button>

        {/* Notifications button */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setDropdownOpen(false);
            }}
            className={`relative p-2 rounded-xl transition-all border border-transparent ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-white hover:bg-slate-900/60 hover:border-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-200'
            }`}
          >
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
            <Bell className="w-5 h-5" />
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
              <div className={`absolute right-0 mt-2.5 w-80 rounded-2xl border p-2.5 shadow-2xl z-50 backdrop-blur-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-slate-800/60 bg-[#0c101f]/95 text-slate-100'
                  : 'border-slate-200/80 bg-white/95 text-slate-800'
              }`}>
                <div className={`px-3 py-2 text-xs font-semibold border-b mb-2 flex justify-between items-center ${
                  theme === 'dark' ? 'text-slate-400 border-slate-800/60' : 'text-slate-500 border-slate-100'
                }`}>
                  <span>Notifications</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-500 px-1.5 rounded-full">New Updates</span>
                </div>
                <div className="space-y-1">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors flex flex-col gap-1 ${
                        theme === 'dark'
                          ? `hover:bg-slate-900/50 ${notif.unread ? 'border border-indigo-500/15 bg-indigo-500/5' : ''}`
                          : `hover:bg-slate-50 ${notif.unread ? 'border border-indigo-500/10 bg-indigo-500/5' : ''}`
                      }`}
                    >
                      <p className={`leading-relaxed font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{notif.text}</p>
                      <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{notif.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User profile actions */}
        <div className="relative">
          <button
            id="profile-dropdown-btn"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setNotificationsOpen(false);
            }}
            className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'border-slate-800/60 bg-[#0c101f]/60 hover:bg-slate-900 hover:border-slate-800 text-slate-100'
                : 'border-slate-200/80 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800'
            }`}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-lg object-cover border border-indigo-500/30" />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold font-mono">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AD'}
              </div>
            )}
            <span className={`hidden md:inline text-xs font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{user?.name || 'Demo User'}</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* User Profile Dropdown */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className={`absolute right-0 mt-2.5 w-52 rounded-2xl border p-2 shadow-2xl z-50 backdrop-blur-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'border-slate-800/60 bg-[#0c101f]/95 text-slate-100'
                  : 'border-slate-200/80 bg-white/95 text-slate-800'
              }`}>
                <div className={`px-3 py-2 border-b mb-1.5 ${theme === 'dark' ? 'border-slate-800/60' : 'border-slate-100'}`}>
                  <div className={`text-xs font-bold flex items-center gap-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{user?.role || 'Retention Specialist'}</span>
                  </div>
                  <span className={`text-[10px] font-mono block truncate ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{user?.email || 'user@churnsense.ai'}</span>
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate('/app/settings');
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-xs rounded-xl transition-all text-left cursor-pointer ${
                      theme === 'dark' ? 'text-slate-300 hover:bg-slate-900 hover:text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                      navigate('/');
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
