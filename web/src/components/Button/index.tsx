import React from 'react';

import { Container, IconContainer, TitleContainer } from './styles';
import { ButtonProps } from '../../@types/props';
import Color from '../../themes/Color';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, icon, color = Color.primary, onClick } = props;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (onClick) onClick(e);
  }

  return (
    <Container color={color} onClick={handleClick}>
      <IconContainer>{icon}</IconContainer>
      <TitleContainer>{children}</TitleContainer>
    </Container>
  );
};

export default Button;
