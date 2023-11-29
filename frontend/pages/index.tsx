'use client'
import type { NextPage } from "next";
import Head from "next/head";
import Header1 from "../components/Header1";
import GroupComponent from "../components/GroupComponent";
import styles from "./index.module.css";
import ModalContextProvider from "../context/modalContext";

const Header: NextPage = () => {

  return (
    <div className={styles.header}>
      <ModalContextProvider>
        <Header1 />
        <GroupComponent />
      </ModalContextProvider>
    </div>
  );
};

export default Header;
