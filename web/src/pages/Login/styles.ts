import styled from 'styled-components';
import market from '../../assets/Market.svg';
import Color from '../../themes/Color';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background: url(${market}) no-repeat right bottom;
  background-size: 65% 93%;
`;

export const Content = styled.div`
  display: flex;
  height: 100vh;
  position: absolute;
  z-index: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: 8%;
`;

export const Title = styled.h1`
  font-size: 69px;
  color: ${Color.primaryDark};
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 37px;
  color: ${Color.primary};
  margin-bottom: 20px;
  width: 35vw;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
