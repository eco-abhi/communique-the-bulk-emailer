import { Reveal } from "../../utils/Reveal";
import styles from "./contact.module.css";
import { AiFillMail } from "react-icons/ai";
// import Link from "@bradgarropy/next-link";

export const Contact = () => {
  return (
    <section className="section-wrapper" id="contact">
      <div className={styles.contactWrapper}>
        <Reveal width="100%">
          <h4 className={styles.contactTitle}>
            Contact<span>.</span>
          </h4>
        </Reveal>
        <Reveal width="100%">
          <p className={styles.contactCopy}>
            Shoot us an email if you want to connect! You can also find us on
            Slack on or if that&apos;s more your speed.
          </p>
        </Reveal>
        <Reveal width="100%"></Reveal>
      </div>
    </section>
  );
};
