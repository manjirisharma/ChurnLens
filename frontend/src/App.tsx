import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChurnProvider } from './context/ChurnContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ChurnProvider>
            <AppRoutes />
          </ChurnProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

