import type { NextPage } from "next";
import Button from "./Button";
import styles from "./Leftside.module.css";

const Leftside: NextPage = () => {
  return (
    <div className={styles.leftside}>
      <b className={styles.fastestWayTo}>
        Fastest way to send money to anyone, anywhere.
      </b>
      <div className={styles.fromSecurityAnd}>
        From security and privacy to care and accountability - what matters to
        you matters to us.
      </div>
      <div className={styles.usersWorldwide}>users worldwide</div>
      <b className={styles.k}>4K+</b>
      <Button />
      <a className={styles.learnMore}>Learn more</a>
      <img className={styles.leftsideChild} alt="" src="/ellipse-6@2x.png" />
      <img className={styles.leftsideItem} alt="" src="/ellipse-7@2x.png" />
      <img className={styles.leftsideInner} alt="" src="/ellipse-8@2x.png" />
    </div>
  );
};

export default Leftside;
