import React from 'react';
import GlobalStyle from './GlobalStyle';
import Routes from './routes/index';

import { AuthProvider } from './hooks/auth';
import { DialogProvider } from './hooks/dialog';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <DialogProvider>
        <Routes />
      </DialogProvider>
    </AuthProvider>
  );
};

export default App;
