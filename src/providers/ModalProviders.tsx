import { ReactNode, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import { ModalContent } from "../components/ModalContent";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
  
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
  
    return (
      <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
        {children}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg  flex flex-col items-center justify-center">
              {/* Modal content will be rendered here */}
              <ModalContent />
              <button 
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </ModalContext.Provider>
    );
  };