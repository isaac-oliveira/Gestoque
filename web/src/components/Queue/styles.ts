import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${Color.white};
  border-radius: 8px;
  margin: 10px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const Title = styled.h4``;

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  :active {
    background-color: ${Color.transparentDark};
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin: 0 20px;
  padding: 10px;
  background-color: ${Color.background};
`;

export const ListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SearchContainer = styled.div`
  display: flex;
  max-height: 350px;
  width: 100%;
  background-color: ${Color.white};
  border-radius: 8px;
  overflow-y: scroll;
  scroll-margin: 5px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const Total = styled.h4``;
