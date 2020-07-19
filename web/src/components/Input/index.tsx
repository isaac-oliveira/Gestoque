import React from 'react';
import { Container, IconContainer, Field } from './styles';
import { InputProps } from '../../@types/props';

const Input: React.FC<InputProps> = (props) => {
  const { style, icon, placeholder, type, value, onChange } = props;

  return (
    <Container style={style}>
      <IconContainer>{icon}</IconContainer>
      <Field
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </Container>
  );
};

export default Input;
