import { SectionHeader } from "../../utils/SectionHeader";
import EmailTypeCards from "./EmailTypeCards";

export const Projects = () => {
  return (
    <section className="section-wrapper" id="select-email-type">
      <SectionHeader title="Type" dir="r" />
      <EmailTypeCards />
    </section>
  );
};
