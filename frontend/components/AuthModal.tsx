'use client'
import React, { ReactNode, useContext, useState } from 'react';
import { ModalContext } from '../context/modalContext';
import styles from './Modal.module.css'
import Image from 'next/image';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';

const AuthModal: React.FC<{}> = () => {
    const {
        isModalOpen,
        handleCloseModal,
      } = useContext(ModalContext)

      const [isLogin, setIsLogin] = useState(false)

      const toggleAuth = () => {
        setIsLogin(!isLogin)
      }

  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {
            isLogin ? <><Login />
            <p style={{marginTop:'15px'}}>Don't have an account? <span onClick={toggleAuth} style={{
                color:'#ff8c32',
                fontWeight: '600',
                cursor:'pointer'
            }}>Sign Up</span></p>
            </> : <>
            <Signup />
            <p style={{marginTop:'15px'}}>Already have account? <span onClick={toggleAuth} style={{
                color:'#ff8c32',
                fontWeight: '600',
                cursor:'pointer'
            }}>Login</span></p>
            </>
        }
      </Modal>
  );
};

export default AuthModal;
