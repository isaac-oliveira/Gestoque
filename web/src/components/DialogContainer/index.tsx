import React from 'react';

import { Container, Content } from './styles';
import { DialogProps } from '../../@types/props';

const DialogContainer: React.FC<DialogProps> = ({ children, dialog, hide }) => {
  function handleHide(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) {
      hide();
    }
  }

  return (
    <Container>
      {children}
      {dialog && <Content onClick={handleHide}>{dialog}</Content>}
    </Container>
  );
};

export default DialogContainer;
