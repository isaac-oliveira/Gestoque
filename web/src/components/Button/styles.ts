/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import Color from '../../themes/Color';
import { ColorProps } from '../../@types/props';

export const Container = styled.button<ColorProps>`
  display: flex;
  flex-direction: row;
  margin: 5px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  border: none;
  :active {
    background-color: ${Color.primaryDark};
  }
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

export const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin: 10px 30px;
  color: ${Color.white};
  font-weight: bold;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;
