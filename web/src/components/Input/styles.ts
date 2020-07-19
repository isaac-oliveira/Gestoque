import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  margin: 5px;
  background-color: ${Color.white};
  border-radius: 5px;
`;

export const IconContainer = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${Color.transparentDark};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const Field = styled.input`
  flex: 1;
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: 10px;
`;
