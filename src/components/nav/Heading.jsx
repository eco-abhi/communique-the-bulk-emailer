import styles from "./heading.module.css";
import { MyLinks } from "./components/MyLinks";
import { OutlineButton } from "../buttons/OutlineButton";

export const Heading = () => {
  return (
    <header className={styles.heading}>
      <MyLinks />
      <OutlineButton
        onClick={() =>
          window.open(
            "https://rivianautomotivellc.atlassian.net/wiki/spaces/SC/pages/2613948385/Communique+-+Self-Serving+Bulk+Emailer+Tool+for+Supplier+Operations"
          )
        }
      >
        Docs
      </OutlineButton>
    </header>
  );
};
