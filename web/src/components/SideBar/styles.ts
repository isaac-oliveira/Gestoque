/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Color from '../../themes/Color';
import { ItemSideBarProps } from '../../@types/props';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 25%;
  background-color: ${Color.primary};
  align-items: center;
`;

export const Initial = styled.h1`
  font-size: 80px;
  height: 140px;
  width: 140px;
  margin-top: 30px;
  padding: 25px;
  border-radius: 70px;
  color: ${Color.primary};
  background-color: ${Color.background};
  text-align: center;
`;

export const Name = styled.h5`
  font-size: 22px;
  margin: 20px;
  color: ${Color.white};
`;

export const Divider = styled.div`
  height: 2px;
  width: 70%;
  background-color: ${Color.white};
  align-self: center;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const List = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const Item = styled(Link)<ItemSideBarProps>`
  display: flex;
  flex: 1;
  width: 100%;
  color: ${({ selected }) => (selected ? Color.primary : Color.white)};
  background-color: ${({ selected }) =>
    selected ? Color.white : Color.primary};
  font-size: 24px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
`;

export const Logout = styled.button`
  display: flex;
  width: 100%;
  border: none;
  background: none;
  padding: 20px;
  color: ${Color.white};
  font-size: 24px;
  justify-content: center;
  align-items: center;
  :active {
    background-color: ${Color.transparentDark};
  }
`;
