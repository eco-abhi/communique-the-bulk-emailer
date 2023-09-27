import "./DataViewHeading.css";
// import { MyLinks } from "./components/MyLinks";
import { OutlineButton } from "../../buttons/OutlineButton";

export const DataViewHeading = () => {
  return (
    <header className="heading">
      <span id="app-name" style={{ color: "white", fontSize: "30px" }}>
        Communique
      </span>
      <OutlineButton
        onClick={() =>
          window.open(
            "https://rivianautomotivellc.atlassian.net/wiki/spaces/SC/pages/2613948385/Communique+-+Self-Serving+Bulk+Emailer+Tool+for+Supplier+Operations"
          )
        }
      >
        Doc
      </OutlineButton>
    </header>
  );
};
