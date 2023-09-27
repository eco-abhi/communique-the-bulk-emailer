import "./FileUpload.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  getResponse,
  resetResponse,
} from "../../../redux/slices/fileUploadResSlice";
import { ModalComp } from "../../modal/Modal";
import { useNavigate } from "react-router-dom";
import { SectionHeader } from "../../utils/SectionHeader";
import { Reveal } from "../../utils/Reveal";
import React, { useState, useRef, useEffect } from "react";
import { getColSet } from "../../../redux/slices/getColSetSlice";
import { getFileDetails } from "../../../redux/slices/fileDetailsSlice";
import { StandardButton } from "../../buttons/StandardButton";

export const FileUpload = () => {
  // Component State Variables
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState("none");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [fileUploadIconVisible, setFileUploadIconVisible] = useState("block");

  const filename = useSelector((state) => state.getFileDetails.filename);
  const filesize = useSelector((state) => state.getFileDetails.filesize);
  const selectedEmailAddress = useSelector(
    (state) => state.getSelectedEmailAddress
  );
  const selectedEmaiType = useSelector((state) => state.getSelectedEmailType);
  const fileUploadError = useSelector(
    (state) => state.fileUploadResponse[0]["read-error"]
  );

  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    dispatch(resetResponse());
    const selectedFile = event.target.files[0];
    if ((selectedEmailAddress === null) | (selectedEmaiType === null)) {
      setModalIsVisible(true); // Error for size greater than 25 mb
      setErrorContent(
        "You forgot to select the email address and the email type using the dropdowns above."
      );
    } else if (selectedFile && selectedFile.size <= 25 * 1024 * 1024) {
      // Check if size is less than 25 MB
      setShowProgressBar("display");
      setSelectedFile(selectedFile);
      setFileUploadIconVisible("none");

      // Update file details
      dispatch(getFileDetails({ key: "filename", value: selectedFile.name }));
      dispatch(
        getFileDetails({
          key: "filesize",
          value: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} mb`,
        })
      );
    } else {
      setShowProgressBar("none");
      setFileUploadIconVisible("block");
      setModalIsVisible(true); // Error for size greater than 25 mb
      setErrorContent("Selected file is of size greater than 25 MB.");
    }
  };

  const handleContinueButtonClick = () => {
    window.scrollTo(0, 0);
    navigateTo("/data-view");
  };

  useEffect(() => {
    // This code will run whenever selectedFile changes
    if (selectedFile) {
      // Post file
      getFileUploadRes();
      // Use useSelector to access the Redux state
    }
  }, [selectedFile]); // The second argument is an array of dependencies, in this case, it's [selectedFile]

  // API
  const getFileUploadRes = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8085/upload", formData)
      .then((response) => {
        setTimeout(() => {
          setShowProgressBar("none");
          // setShowFileDetailsTable("block");
          setFileUploadIconVisible("block");
          if (response.data["read-error"] === "true") {
            setModalIsVisible(true);
            setErrorContent(response.data["error-message"]);
            dispatch(resetResponse());
          } else {
            dispatch(getResponse(response.data));
            dispatch(getColSet(response.data));

            window.scrollTo(0, 0);
            navigateTo("/data-view"); // Redirect to PreProcessedView
            // setNextButtonVisible(true);
          }
        }, 2000);
      })
      .catch((error) => {
        setShowProgressBar("none");
        setModalIsVisible(true);
        setErrorContent(error.toString());
        setFileUploadIconVisible("block");
        dispatch(resetResponse());
      });
  };

  return (
    <section
      className="section-wrapper"
      id="upload-file"
      style={{ height: "100vh", paddingBottom: "20%" }}
    >
      <SectionHeader title="Upload" dir="l" />
      <div>
        <div style={{ topPadding: "20px" }}>
          <Reveal>
            <p
              style={{
                fontSize: "20px",
                color: "#EBECF3",
                marginTop: "55px",
              }}
            >
              Now, let's look at the{" "}
              <span style={{ color: "#0DFF9D" }}>data</span> you'd like to use
              to send emails.&nbsp;
            </p>

            <p
              style={{
                fontSize: "20px",
                color: "#EBECF3",
                marginTop: "20px",
              }}
            >
              Please upload a csv or Excel file using the button below.
            </p>

            <em>
              <p
                style={{
                  fontSize: "16px",
                  marginTop: "65px",
                }}
              >
                * The file size must be less than 25 mb.
              </p>
            </em>
          </Reveal>
        </div>
      </div>
      {/* <Reveal> */}
      <div
        style={{
          marginTop: "10rem",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            color: "#09FF9D",
            display: showProgressBar,
            marginTop: "15rem",
          }}
          spacing={2}
        >
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </Stack>
        {modalIsVisible && (
          <ModalComp
            modalTitle={"Error!"}
            modalContent={errorContent}
            openMod={modalIsVisible}
            setOpenMod={setModalIsVisible}
          />
        )}
        <div
          className="fileDetails"
          style={{
            marginTop: "5rem",
          }}
        >
          {filename !== "" ? (
            <table id="file-details">
              <tbody>
                <tr>
                  <td>File Name</td>
                  <td>{filename}</td>
                </tr>
                <tr>
                  <td>File Size</td>
                  <td>{filesize}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "60%",
            alignItems: "center",
            marginTop: "4%",
          }}
        >
          <label
            htmlFor="fileInput"
            className="file-upload"
            style={{
              fontSize: "20px",
              color: "#EBECF3",
              // marginBottom: "9%",
              // marginTop: "8rem" /* 4 times the root font size */,
              // marginLeft: "70rem" /* 4 times the root font size */,

              display: fileUploadIconVisible,
            }}
          >
            <input
              id="fileInput"
              type="file"
              accept=".xlsx, .csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <img
              src={"../../../../src/assets/paper-airplane.png"}
              alt={"File Upload"}
              className="file-upload-image"
            />
          </label>
        </div>
        {filename !== "" && fileUploadError !== "true" ? (
          <StandardButton onClick={handleContinueButtonClick}>
            Next
          </StandardButton>
        ) : null}
      </div>
    </section>
  );
};
