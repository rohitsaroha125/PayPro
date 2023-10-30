import type { NextPage } from "next";
import styles from "./Button.module.css";

const Button: NextPage = () => {
  return (
    <button className={styles.button}>
      <div className={styles.buttonChild} />
      <div className={styles.getStarted}>Get started</div>
    </button>
  );
};

export default Button;
