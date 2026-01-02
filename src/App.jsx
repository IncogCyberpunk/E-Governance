import React, { useState } from 'react';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { Route, Routes, Navigate } from 'react-router-dom'
import NotFound from './pages/NotFound';

// Protected Route Component
function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <DarkModeProvider>
      <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ?
            <Navigate to="/dashboard" replace /> :
            <LoginPage onLogin={handleLogin} />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* <Route */}
      {/*   path="/record/:id" */}
      {/*   element={ */}
      {/*     <ProtectedRoute isLoggedIn={isLoggedIn}> */}
      {/*       <RecordDetail user={user} /> */}
      {/*     </ProtectedRoute> */}
      {/*   } */}
      {/* /> */}

      {/* Default redirect */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
      </Routes>
    </DarkModeProvider>
  );
}

export default App
