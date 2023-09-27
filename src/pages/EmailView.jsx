import { useSelector } from "react-redux"; // Import useSelector
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import QuillEditor from "../components/QuillEditor";
// import EmailAddressInputs from "../components/EmailAddressInputs";
// import EmailSubjectInput from "../components/EmailSubjectInput";
import EmailViewComp from "../components/emailView/EmailViewComp";

function EmailView() {
  return (
    <>
      <EmailViewComp />
    </>
  );
}

export default EmailView;
