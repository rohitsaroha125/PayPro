import React, { createContext, useState } from "react"
import Modal from "../components/Modal";

export const ModalContext = createContext({
    isModalOpen: false,
    handleOpenModal: () => {},
    handleCloseModal: () => {}
  })

const ModalContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

    return(
        <ModalContext.Provider value={{
            isModalOpen,
            handleCloseModal,
            handleOpenModal
        }}>
            {children}
        </ModalContext.Provider>
    )   
}

export default ModalContextProvider