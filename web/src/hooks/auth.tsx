import React, { useState, useContext, createContext, useEffect } from 'react';
import * as Api from '../services/api';

import { Auth } from '../@types/auth';

export const AuthContext = createContext({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);

  useEffect(() => {
    const id = localStorage.getItem('@gestoque/id');
    const token = localStorage.getItem('@gestoque/token');

    setLogged(!!id && !!token);
  }, []);

  async function login(username: string, password: string): Promise<void> {
    const data = await Api.login(username, password);

    const { id, token } = data;

    localStorage.setItem('@gestoque/id', JSON.stringify(id));
    localStorage.setItem('@gestoque/token', token);

    setLogged(!!id && !!token);
  }

  function logout(): void {
    localStorage.clear();
    setLogged(false);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        logged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(): Auth {
  const context = useContext<Auth>(AuthContext);

  return context;
}
