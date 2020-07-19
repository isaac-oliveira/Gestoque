import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SideBar from '../components/SideBar';

import Cash from '../pages/Cash';
import Stock from '../pages/Stock';
import Resume from '../pages/Resume';
import Debts from '../pages/Debts';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <SideBar>
        <Switch>
          <Route path="/cash" component={Cash} />
          <Route path="/stock" component={Stock} />
          <Route path="/resume" component={Resume} />
          <Route path="/debts" component={Debts} />
        </Switch>
      </SideBar>
    </BrowserRouter>
  );
};

export default AppRouter;
