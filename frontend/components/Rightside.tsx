import type { NextPage } from "next";
import styles from "./Rightside.module.css";
import Image from "next/image";

const Rightside: NextPage = () => {
  return (
    <div className={styles.rightside}>
      <div className={styles.rightsideChild} />
      <Image
        className={styles.happyBeardedYoungManLooksIcon}
        alt=""
        src="/happybeardedyoungmanlookswithjoyfulexpressionhasfriendlysmilewearsyellowsweaterredhat-1@2x.png"
      />
      <Image className={styles.rightsideItem} alt="" src="/vector-2.svg" />
      <div className={styles.rightsideInner} />
      <Image className={styles.ellipseIcon} alt="" src="/ellipse-2@2x.png" />
      <b className={styles.received}>Received!</b>
      <div className={styles.ellipseDiv} />
      <div className={styles.rightsideChild1} />
      <Image className={styles.frameIcon} alt="" src="/frame-4.svg" />
      <div className={styles.ellipseParent}>
        <div className={styles.frameChild} />
        <Image className={styles.checkIcon} alt="" src="/check.svg" />
        <div className={styles.youJustSent}>
          You just sent $20.00 to Sofia Alexander
        </div>
      </div>
    </div>
  );
};

export default Rightside;
