import type { NextPage } from "next";
import Head from "next/head";
import Header1 from "../components/Header1";
import GroupComponent from "../components/GroupComponent";
import styles from "./index.module.css";

const Header: NextPage = () => {
  return (
    <div className={styles.header}>
      <Header1 />
      <GroupComponent />
    </div>
  );
};

export default Header;
