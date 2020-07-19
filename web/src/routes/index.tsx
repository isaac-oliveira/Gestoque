import React from 'react';
import AppRouter from './AppRouter';
import Login from '../pages/Login';
import useAuth from '../hooks/auth';

const Routes: React.FC = () => {
  const { logged } = useAuth();
  if (logged) {
    return <AppRouter />;
  }
  return <Login />;
};

export default Routes;
