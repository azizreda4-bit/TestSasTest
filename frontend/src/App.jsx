import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/auth/LoginPage';

// Simple loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

// Simple protected route component
const ProtectedRoute = ({ children }) => {
  // For now, just render children - we'll add auth logic later
  return children;
};

// Simple Dashboard Page
const DashboardPage = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome to your dashboard! Here you can manage your activities and view reports.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Users</h3>
        <p className="text-2xl font-bold text-blue-600">120</p>
        <p className="text-sm text-gray-500">Total active users</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales</h3>
        <p className="text-2xl font-bold text-green-600">$5,400</p>
        <p className="text-sm text-gray-500">Revenue this month</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tasks</h3>
        <p className="text-2xl font-bold text-yellow-600">8</p>
        <p className="text-sm text-gray-500">Pending tasks</p>
      </div>
    </div>
  </div>
);

// Placeholder pages for other routes
const OrdersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Commandes</h1>
    <p>Page des commandes en cours de développement...</p>
  </div>
);

const CustomersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Clients</h1>
    <p>Page des clients en cours de développement...</p>
  </div>
);

const ProvidersPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Transporteurs</h1>
    <p>Page des transporteurs en cours de développement...</p>
  </div>
);

const CommunicationsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Communications</h1>
    <p>Page des communications en cours de développement...</p>
  </div>
);

const AnalyticsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Analytiques</h1>
    <p>Page des analytiques en cours de développement...</p>
  </div>
);

const SettingsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
    <p>Page des paramètres en cours de développement...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <TenantProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Routes>
                {/* Public Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <OrdersPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/customers" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CustomersPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/providers" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ProvidersPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/communications" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CommunicationsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AnalyticsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <SettingsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                
                {/* 404 Page */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900">404</h1>
                      <p className="text-gray-600">Page non trouvée</p>
                      <a href="/dashboard" className="text-blue-600 hover:text-blue-500">
                        Retour au tableau de bord
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </TenantProvider>
    </ThemeProvider>
  );
}

export default App;