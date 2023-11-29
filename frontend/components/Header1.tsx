'use client'
import type { NextPage } from "next";
import styles from "./Header1.module.css";
import { useContext } from "react";
import { ModalContext } from "../context/modalContext";
import Modal from "./Modal";

const Header1: NextPage = () => {

  const {
    isModalOpen,
    handleCloseModal,
    handleOpenModal
  } = useContext(ModalContext)

  return (
    <>
    <div className={styles.header}>
      <div className={styles.iconParent}>
        <img className={styles.icon} alt="" src="/icon.svg" />
        <b className={styles.faspay}>Faspay</b>
      </div>
      <div className={styles.menu}>
        <div className={styles.howItWorks}>How it works</div>
        <div className={styles.pricing}>Pricing</div>
        <div className={styles.pricing}>Help center</div>
        <div className={styles.pricing}>News</div>
      </div>
      <button className={styles.button} onClick={handleOpenModal}>
        <div className={styles.buttonChild} />
        <div className={styles.signUp}>Sign Up</div>
      </button>
    </div>
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>This is your modal content</h2>
        <p>More modal content here...</p>
      </Modal>
    </>
  );
};

export default Header1;
