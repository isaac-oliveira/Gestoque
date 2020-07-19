import styled from 'styled-components';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  flex: 1;
`;

export const Content = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 5;
  background-color: ${Color.transparentDark};
  justify-content: center;
  align-items: center;
`;
