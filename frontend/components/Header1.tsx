import type { NextPage } from "next";
import styles from "./Header1.module.css";

const Header1: NextPage = () => {
  return (
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
      <button className={styles.button}>
        <div className={styles.buttonChild} />
        <div className={styles.signUp}>Sign Up</div>
      </button>
    </div>
  );
};

export default Header1;
