import type { NextPage } from "next";
import Leftside from "./Leftside";
import Rightside from "./Rightside";
import styles from "./GroupComponent.module.css";

const GroupComponent: NextPage = () => {
  return (
    <div className={styles.leftsideParent}>
      <Leftside />
      <Rightside />
    </div>
  );
};

export default GroupComponent;
