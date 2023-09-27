import { Reveal } from "../../utils/Reveal";
import { SectionHeader } from "../../utils/SectionHeader";
import styles from "./selectEmail.module.css";
import { SelectEmailAddress } from "./SelectEmailAddress";
import { AiOutlineArrowRight } from "react-icons/ai";

export const SelectEmail = () => {
  return (
    <section
      id="select-email"
      className="section-wrapper"
      style={{ height: "100vh" }}
    >
      <SectionHeader title="Email" dir="l" />
      <div>
        <div style={{ topPadding: "20px" }}>
          <Reveal>
            <em>
              <p
                style={{
                  fontSize: "30px",
                  color: "#0DFF9D",
                  marginTop: "55px",
                }}
              >
                First things first!&nbsp;
              </p>
            </em>

            <br />
          </Reveal>
          <Reveal>
            <p style={{ fontSize: "20px", marginTop: "20px" }}>
              Please use the dropdown below to select the email address you want
              to use to send emails.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            className={styles.links}
            style={{ width: "400px", marginTop: "65px" }}
          >
            <div className={styles.linksText}>
              <AiOutlineArrowRight size={60} />
            </div>
            <SelectEmailAddress />
          </div>
        </Reveal>

        <Reveal>
          <em>
            <p
              style={{
                fontSize: "17px",
                marginTop: "3rem",
              }}
            >
              * Please contact us if you do not see your email or would like us
              to add email address.
            </p>
          </em>
          <br />
          <br />
        </Reveal>
      </div>
    </section>
  );
};
