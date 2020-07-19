/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  width: 40%;
  border-radius: 8px;
  padding: 20px;
  background-color: ${Color.white};
`;

export const Header = styled.div`
  display: flex;
  padding-bottom: 10px;
  justify-content: center;
`;

export const Title = styled.h3`
  display: flex;
  font-size: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Label = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: ${Color.primaryDark};
`;

export const Input = styled.input`
  display: flex;
  padding: 10px;
  border: 1px solid ${Color.textGrey};
  border-radius: 8px;
`;

export const ValueContainer = styled.div`
  display: flex;
`;

export const PurchaseContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-right: 10px;
`;

export const SaleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
`;

export const AmountContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AmountContent = styled.div`
  display: flex;
  align-items: center;
`;

export const AmountInput = styled.input`
  padding: 10px;
  border: 1px solid ${Color.textGrey};
  border-radius: 8px;
  margin-right: 5px;
`;

interface AmountButtonProps {
  color: string;
}

export const ButtonContainer = styled.button<AmountButtonProps>`
  padding: 10px;
  background: none;
  border: 1px solid ${({ color }) => color};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  :active {
    background-color: ${Color.transparentDark};
  }
`;

export const StockAmount = styled.p`
  padding-left: 10px;
  font-weight: bold;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
`;

export const ButtonCancelar = styled.button`
  display: flex;
  padding: 15px;
  margin: 0 10px;
  border-radius: 5px;
  color: ${Color.accent};
  font-size: 20px;
  background: none;
  border: none;
  :active {
    background-color: ${Color.transparentDark};
  }
`;
