// Modal.tsx
import React, { ReactNode } from 'react';
import styles from './Modal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles.modal}>
        <button className={styles['close-btn']} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
