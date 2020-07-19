import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  Container,
  MenuBar,
  Initial,
  Name,
  Divider,
  List,
  Item,
  Logout,
} from './styles';
import { SideBarUser } from '../../@types/state';
import useAuth from '../../hooks/auth';
import { getEstablishment } from '../../services/api';

const SideBar: React.FC = ({ children }) => {
  const [user, setUser] = useState<SideBarUser>({ initial: '', name: '' });
  const history = useHistory();
  const routes = useLocation();

  const { logout } = useAuth();

  useEffect(() => {
    getEstablishment().then((response) => {
      setUser({
        initial: response.name[0].toUpperCase(),
        name: response.name,
      });
    });
    history.push('/cash');
  }, [history]);

  function handleLogout(): void {
    logout();
    history.push('/');
  }

  return (
    <Container>
      <MenuBar>
        <Initial>{user.initial}</Initial>
        <Name>{user.name}</Name>
        <Divider />
        <List>
          <Item selected={routes.pathname === '/cash'} to="/cash">
            Caixa
          </Item>
          <Item selected={routes.pathname === '/stock'} to="/stock">
            Estoque
          </Item>
          <Item selected={routes.pathname === '/resume'} to="/resume">
            Resumo
          </Item>
          <Item selected={routes.pathname === '/debts'} to="/debts">
            Dividas
          </Item>
        </List>
        <Divider />
        <Logout onClick={handleLogout}>SAIR</Logout>
      </MenuBar>
      {children}
    </Container>
  );
};

export default SideBar;
