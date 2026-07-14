import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layout Wrappers
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const CustomerAssessment = lazy(() => import('../pages/CustomerAssessment'));
const ProcessingPage = lazy(() => import('../pages/ProcessingPage'));
const PredictionResult = lazy(() => import('../pages/PredictionResult'));
const Analytics = lazy(() => import('../pages/Analytics'));
const CustomerHistory = lazy(() => import('../pages/CustomerHistory'));
const Settings = lazy(() => import('../pages/Settings'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Premium fallback loader
const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#020617]">
    <div className="relative flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
      <div className="absolute w-6 h-6 border-2 border-t-cyan-400 border-transparent rounded-full animate-spin animate-reverse" style={{ animationDuration: '0.8s' }}></div>
    </div>
  </div>
);

// Protected Route Shield wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <RouteLoader />;
  }

  if (!isAuthenticated) {
    // Redirect to login page but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        
        {/* Public Marketing & Session Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Dashboard Workspace (Guarded) */}
        <Route path="/app" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assess" element={<CustomerAssessment />} />
          <Route path="processing" element={<ProcessingPage />} />
          <Route path="result" element={<PredictionResult />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<CustomerHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch All 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
