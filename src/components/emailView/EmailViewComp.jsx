import "./EmailViewComp.css";

import EmailEditor from "./emailEditor/EmailEditor";
import EmailAddressInput from "./emailAddressInput/EmailAddressInput";
import EmailSubjectInput from "./emailSubjectInput/EmailSubjectInput";
import EmailViewHeading from "./emailViewHeading/EmailViewHeading";
import FileAttachmentContainer from "./fileAttachmentContainer/FileAttachmentContainer";
import { PreviousButton } from "../buttons/PreviousButton";
import { StandardButton } from "../buttons/StandardButton";
import { CCButton } from "../buttons/CCButton";
import { BCCButton } from "../buttons/BCCButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Reveal } from "../utils/Reveal";
import { postEmailPreview } from "./emailViewUtils/EmailViewUtils";

function EmailViewComp() {
  const [ccInputVisible, setCCInputVisible] = useState(false);
  const [bccInputVisible, setBCCInputVisible] = useState(false);
  const [ccButtonVisible, setCCButtonVisible] = useState(true);
  const [bccButtonVisible, setBCCButtonVisible] = useState(true);
  const [emailAddressInputValue, setEmailAddressInputValue] = useState("");
  const [ccInputValue, setCCInputValue] = useState("");
  const [bccInputValue, setBCCInputValue] = useState("");
  const [subjectInputValue, setSubjectInputValue] = useState("");
  const [emailBodyInputValue, setEmailBodyInputValue] = useState("");

  // Callback function to receive the value from the child component
  const receiveEmailInputValue = (value) => {
    setEmailAddressInputValue(value);
  };

  // Callback function to receive the value from the child component
  const receiveCCInputValue = (value) => {
    setCCInputValue(value);
  };

  // Callback function to receive the value from the child component
  const receiveBCCInputValue = (value) => {
    setBCCInputValue(value);
  };

  // Callback function to receive the value from the child component
  const receiveSubjectInputValue = (value) => {
    setSubjectInputValue(value);
  };

  // Callback function to receive the value from the child component
  const receiveEmailBodyInputValue = (value) => {
    setEmailBodyInputValue(value);
  };
  const emailCols = useSelector((state) => state.getColSet.eMail);
  const userSelectedCols = useSelector((state) => state.getColSet);
  const aggTypes = useSelector((state) => state.getAggregationType);

  const navigateTo = useNavigate();

  const handleBackButtonClick = () => {
    window.scrollTo(0, 0);
    navigateTo("/data-view"); // Redirect to PreProcessedView
  };

  const handleCCButtonClick = () => {
    setCCInputVisible(true);
    setCCButtonVisible(false);
  };

  const handleBCCButtonClick = () => {
    setBCCInputVisible(true);
    setBCCButtonVisible(false);
  };

  const handleTrialEmailButton = () => {};

  const handleGeneratePreviewButton = () => {
    postEmailPreview({
      ...userSelectedCols,
      ...{ emailAddresInput: emailAddressInputValue },
      ...{ cclInput: ccInputValue },
      ...{ bccInput: bccInputValue },
      ...{ subjectInput: subjectInputValue },
      ...{ emailBodyInput: emailBodyInputValue },
    });
  };

  return (
    <>
      <div className="email-form-instructions">
        <h2>Email Form Instructions</h2>

        <ol>
          <li>
            <strong>Email Address:</strong> Enter the recipient's email address
            in the "Email Address" input field.
          </li>
          <li>
            <strong>Subject:</strong> Provide a subject for your email in the
            "Subject" input field.
          </li>
          <li>
            <strong>Email Body:</strong> Compose the content of your email in
            the text area provided under "Email Body."
          </li>
          <li>
            <strong>Attachments:</strong> If you have files to attach to the
            email, click the "Attach Files" button and select the files you want
            to include. Files must be under 5 MB in size. The file names must be
            unique.
          </li>
          <li>
            <strong>Dynamic Data:</strong> To insert data dynamically from
            columns in a file, use the '/' key. Type '/' in the email body text
            area, and a dropdown menu will appear. Select the desired data from
            the dropdown to insert it into the email body.
          </li>
          <li>
            <strong>CC and BCC:</strong> If you need to add CC (Carbon Copy) or
            BCC (Blind Carbon Copy) recipients, click the respective buttons
            labeled "CC" and "BCC." Additional input fields for email addresses
            will appear.
          </li>
          <li>
            <strong>Send Email:</strong> After composing your email, click the
            "Send" button to send the email.
          </li>
          <li>
            <strong>Navigation Buttons:</strong> Use the navigation buttons at
            the bottom of the form to move between different sections of the
            email form, if applicable.
          </li>
          <li>
            <strong>Error Handling:</strong> If you encounter any errors, such
            as invalid email addresses or file size exceeding 5 MB, the form
            will display error messages. Please review and correct any issues
            before sending the email.
          </li>
          <li>
            <strong>Confirmation:</strong> Once you've successfully sent the
            email, you will receive a confirmation message.
          </li>
          <li>
            <strong>Additional Features:</strong> Explore other features as
            needed, such as attaching more files or using advanced formatting
            options in the email body.
          </li>
        </ol>
      </div>

      <EmailViewHeading />
      <div className="email-view-container">
        <div className="email-view-form">
          <EmailAddressInput
            emailAddressType={"email"}
            emailCols={emailCols}
            emailInputValueCallback={receiveEmailInputValue}
          />
          {ccInputVisible && (
            <EmailAddressInput
              emailAddressType={"cc"}
              emailCols={emailCols}
              emailInputValueCallback={receiveCCInputValue}
            />
          )}
          {bccInputVisible && (
            <EmailAddressInput
              emailAddressType={"bcc"}
              emailCols={emailCols}
              emailInputValueCallback={receiveBCCInputValue}
            />
          )}

          <div className="cc-bcc-buttons">
            {ccButtonVisible && (
              <CCButton
                onClickCC={handleCCButtonClick}
                style={{ background: "red" }}
              />
            )}
            {bccButtonVisible && (
              <BCCButton
                onClickBCC={handleBCCButtonClick}
                style={{ background: "red" }}
              />
            )}
          </div>
          <EmailSubjectInput
            subjectInputValueCallback={receiveSubjectInputValue}
          />
          <FileAttachmentContainer />
          <EmailEditor emailInputValueCallback={receiveEmailBodyInputValue} />
        </div>

        <div className="nav-email-buttons">
          <PreviousButton onClick={handleBackButtonClick}>
            Previous
          </PreviousButton>
          <PreviousButton onClick={handleGeneratePreviewButton}>
            Generate Preview
          </PreviousButton>
          <StandardButton onClick={handleTrialEmailButton}>
            Send Trial Emails
          </StandardButton>
        </div>
      </div>
    </>
  );
}

export default EmailViewComp;
