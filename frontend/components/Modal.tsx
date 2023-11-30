// Modal.tsx
import React, { ReactNode } from 'react';
import styles from './Modal.module.css'
import Image from 'next/image';

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
        <Image className={styles.crossIcon} src="/cross.png" width={17.5} height={17.5} alt="Cross Icon" onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
