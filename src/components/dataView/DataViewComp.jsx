import { DataViewHeading } from "./dataViewHeading/DataViewHeading";
import DataTable from "./dataTable/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StandardButton } from "../buttons/StandardButton";
import { PreviousButton } from "../buttons/PreviousButton";
import { Reveal } from "../utils/Reveal";
import DragNDropContainers from "./dragNDrop/DragNDropContainers";

import "./DataViewComp.css";

function DataViewComp() {
  const emailCols = useSelector((state) => state.getColSet.eMail);
  const listCols = useSelector((state) => state.getColSet.nonEmail);
  const aggCols = useSelector((state) => state.getColSet.agg);
  const groupByCols = useSelector((state) => state.getColSet.groupBy);
  const numericCols = useSelector((state) => state.getColSet.numeric);
  const aggregationTypeDict = useSelector((state) => state.getAggregationType);

  const navigateTo = useNavigate();

  const handleContinueButtonClick = () => {
    window.scrollTo(0, 0);
    navigateTo("/email-editor");
  };
  const handleBackButtonClick = () => {
    window.scrollTo(0, 0);
    navigateTo("/#contact");
  };

  return (
    <>
      <DataViewHeading />
      <div className="hero-img-data-view">
        <img src="../../../src/assets/optimize_img.svg" alt="hero-image" />
      </div>

      <Reveal>
        <p
          style={{
            marginTop: "5%",
            marginBottom: "3%",
            padding: "0rem 14rem 0rem 14rem",
          }}
        >
          Let's optimize your email dataset. Please take a moment to review your
          data using the table below. You can also drag column names into the
          maroon box at the top of the table to group-by columns.
        </p>
      </Reveal>
      <Reveal>
        <p
          style={{
            marginBottom: "2%",
            padding: "0rem 14rem 0rem 14rem",
          }}
        >
          And then select the specific column values you would like to use for
          your emails. Simply use the intuitive drag-and-drop feature below to
          make your choices. Please refer to the example below for more help or
          contact us.
        </p>
      </Reveal>

      <div id="data-table">
        <DataTable />
      </div>

      <Reveal>
        <p
          style={{
            marginBottom: "4%",
            marginTop: "2%",
            padding: "0rem 14rem 0rem 14rem",
          }}
        >
          Please use the Drag-N-Drop feature below to select and categorize the
          columns as required.
        </p>
      </Reveal>

      <DragNDropContainers
        emailCols={emailCols}
        listCols={listCols}
        aggCols={aggCols}
        groupByCols={groupByCols}
        numericCols={numericCols}
      />
      <div className="nav-buttons">
        <PreviousButton
          onClick={handleBackButtonClick}
          style={{ background: "red" }}
        >
          Previous
        </PreviousButton>
        <StandardButton onClick={handleContinueButtonClick}>
          Next
        </StandardButton>
      </div>
    </>
  );
}

export default DataViewComp;
