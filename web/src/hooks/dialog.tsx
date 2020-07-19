import React, { useState, useContext, createContext } from 'react';
import { Dialog } from '../@types/dialog';
import DialogContainer from '../components/DialogContainer';

export const DialogContext = createContext({} as Dialog);

export const DialogProvider: React.FC = ({ children }) => {
  const [dialogElement, setDialogElement] = useState<
    (() => React.ReactElement) | null
  >(null);

  function show(dialog: () => React.ReactElement): void {
    setDialogElement(dialog);
  }

  function hide(): void {
    setDialogElement(null);
  }

  return (
    <DialogContext.Provider value={{ show, hide }}>
      <DialogContainer hide={hide} dialog={dialogElement}>
        {children}
      </DialogContainer>
    </DialogContext.Provider>
  );
};

export default function useDialog(): Dialog {
  const context = useContext<Dialog>(DialogContext);

  return context;
}
