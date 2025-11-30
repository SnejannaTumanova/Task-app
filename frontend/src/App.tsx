import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Отслеживаем изменения токена
  useEffect(() => {
    const handler = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage onAuth={() => setIsLoggedIn(true)} />} />

      <Route
        path="/dashboard"
        element={isLoggedIn ? <DashboardPage /> : <Navigate to="/auth" replace />}
      />

      <Route path="*" element={<Navigate to={isLoggedIn ? '/dashboard' : '/auth'} replace />} />
    </Routes>
  );
};

export default App;
