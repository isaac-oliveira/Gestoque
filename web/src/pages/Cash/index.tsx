import React, { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

import { Container, Content, SecondQueue, ButtonContainer } from './styles';
import Input from '../../components/Input';
import Queue from '../../components/Queue';
import Color from '../../themes/Color';

const Cash: React.FC = () => {
  const [showSecondQueue, setShowSecondQueue] = useState<boolean>(false);

  function handleShowQueue(): void {
    setShowSecondQueue(true);
  }

  function handleHideQueue(): void {
    setShowSecondQueue(false);
  }

  return (
    <Container>
      <Input icon={<FiSearch color="white" />} placeholder="Buscar produto" />
      <Content>
        <Queue title="Fila 1" />
        {showSecondQueue && (
          <Queue title="Fila 2" hideQueue={handleHideQueue} />
        )}
        {!showSecondQueue && (
          <SecondQueue>
            <ButtonContainer onClick={handleShowQueue}>
              <FiPlus size={28} color={Color.white} />
            </ButtonContainer>
          </SecondQueue>
        )}
      </Content>
    </Container>
  );
};

export default Cash;
