import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${Color.white};
  border-radius: 8px;
  margin: 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: center;
`;

export const Title = styled.h2``;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 8px;
  margin: 0 30px;
  padding: 10px;
  background-color: ${Color.background};
  align-items: center;
`;

export const ListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: ${Color.white};
`;

export const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled.p`
  display: flex;
  padding: 5px 0;
`;

export const Type = styled.p`
  display: flex;
  padding: 5px 0;
`;

export const Value = styled.p`
  display: flex;
  padding: 5px 0;
`;

export const StockAmount = styled.p`
  display: flex;
  align-self: flex-end;
`;

export const ButtonContainer = styled.button`
  display: flex;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 5px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  :active {
    background-color: ${Color.transparentDark};
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 30px;
  justify-content: flex-end;
  align-items: center;
`;
