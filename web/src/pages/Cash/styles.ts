import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  margin: 5px;
`;

export const SecondQueue = styled.div`
  display: flex;
  flex: 1;
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: none;
  background-color: ${Color.primary};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  :active {
    background-color: ${Color.primaryDark};
  }
`;
