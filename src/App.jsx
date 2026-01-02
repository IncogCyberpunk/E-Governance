import React, { useState } from 'react';
import LoginPage from './Login';
import Dashboard from './Dashboard';
import GovLogin from './GovLogin';
import GovDashboard from './GovDashboard';
import { DarkModeProvider } from './contexts/DarkModeContext';

export default function App() {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCitizenLogin = (userData) => {
    setUser(userData);
    setUserType('citizen');
    setIsLoggedIn(true);
  };

  const handleGovLogin = (userData) => {
    setUser(userData);
    setUserType('government');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setIsLoggedIn(false);
  };

  return (
    <DarkModeProvider>
      {!userType && !isLoggedIn && (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                E-Governance Nepal
              </h1>
              <p className="text-xl text-gray-600">
                Centralized Health Records System
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div 
                onClick={() => setUserType('citizen')}
                className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Citizen Portal
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Access your personal health records
                </p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Login as Citizen
                </button>
              </div>

              <div 
                onClick={() => setUserType('government')}
                className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  Government Portal
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Analytics and oversight dashboard
                </p>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Login as Administrator
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {userType === 'citizen' && !isLoggedIn && (
        <LoginPage onLogin={handleCitizenLogin} />
      )}
      
      {userType === 'citizen' && isLoggedIn && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}

      {userType === 'government' && !isLoggedIn && (
        <GovLogin onLogin={handleGovLogin} />
      )}
      
      {userType === 'government' && isLoggedIn && (
        <GovDashboard user={user} onLogout={handleLogout} />
      )}
    </DarkModeProvider>
  );
}