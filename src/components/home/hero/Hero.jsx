import { StandardButton } from "../../buttons/StandardButton";
import { Reveal } from "../../utils/Reveal";
import { DotGrid } from "./DotGrid";
import styles from "./hero.module.css";

export const Hero = () => {
  return (
    <section className={`section-wrapper ${styles.hero}`}>
      <div className={styles.copyWrapper}>
        <Reveal>
          <h1 className={styles.title}>
            Hey, I&apos;m{" "}
            <span id="app-name" style={{ color: "#EBECF3" }}>
              <br />
              Communique&nbsp;
            </span>
            <span>.</span>
          </h1>
        </Reveal>
        <Reveal>
          <br />
          <h2 className={styles.subTitle}>
            I am your <span>Ultimate Bulk E-mail Buddy</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className={styles.aboutCopy}>
            My name might be long but I can help you send thousands of emails in{" "}
            <b>
              <em>
                <span style={{ color: "#09FF9D", fontSize: "25px" }}>SIX</span>
              </em>
            </b>
            &nbsp;&nbsp;short and easy steps
          </p>
        </Reveal>
        <Reveal>
          <StandardButton
            onClick={() =>
              document.getElementById("select-email")?.scrollIntoView()
            }
          >
            Let's get started!
          </StandardButton>
        </Reveal>
      </div>
      <DotGrid />
    </section>
  );
};
