import React from "react";
import { SideBar } from "../nav/SideBar";
import { Hero } from "./hero/Hero";
import styles from "./home.module.css";
import { Heading } from "../nav/Heading";
import { SelectEmail } from "./emailAddress/SelectEmail";
import { Projects } from "./emailType/EmailTypes";
import { FileUpload } from "./fileUpload/FileUpload";
import { Contact } from "./contact/Contact";

const HomeComp = () => {
  return (
    <>
      <div className={styles.home}>
        <SideBar />
        <main>
          <Heading />
          <Hero />
          <SelectEmail />
          <Projects />
          <FileUpload />
          <Contact />
          <div
            style={{
              height: "200px",
              background:
                "linear-gradient(180deg, var(--background), var(--background-dark))",
            }}
          />
        </main>
      </div>
    </>
  );
};

export default HomeComp;
