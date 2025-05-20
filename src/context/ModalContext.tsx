import  { createContext  } from "react";


type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};


export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});






