import React from 'react';
import { FiUser, FiKey, FiLogIn } from 'react-icons/fi';
import { Container, Content, Title, Description, Form } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import useAuth from '../../hooks/auth';

const Login: React.FC = () => {
  const { login } = useAuth();

  async function handleLogin(): Promise<void> {
    await login('Isaac2020', '12345');
  }

  return (
    <Container>
      <Content>
        <Title>Seja bem-vindo(a)</Title>
        <Description>
          Gerencie seu negócio de uma forma mais eficiente.
        </Description>
        <Form>
          <Input
            style={{ width: '45%' }}
            icon={<FiUser color="white" />}
            placeholder="Usuário"
          />
          <Input
            style={{ width: '45%' }}
            icon={<FiKey color="white" />}
            placeholder="Senha"
            type="password"
          />
          <Button icon={<FiLogIn color="white" />} onClick={handleLogin}>
            Entrar
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Login;
