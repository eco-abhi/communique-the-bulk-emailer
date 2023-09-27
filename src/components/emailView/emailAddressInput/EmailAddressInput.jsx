import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCursorPos, escapeRegExp } from "../emailViewUtils/EmailViewUtils";
import DropdownMenu from "../dropdownMenu/DropdownMenu"; // Your Dropdown component
import "./EmailAddressInput.css";
import {
  setCCError,
  setBCCError,
  setEmailAddressError,
} from "../../../redux/slices/errorsInEmailAndSubjectInputsSlice";

const EmailAddressInputs = ({
  emailAddressType,
  emailCols,
  emailInputValueCallback,
}) => {
  const dispatch = useDispatch();

  // Escape special characters in strings
  const escapedStrings = emailCols.map(escapeRegExp);

  // Create a dynamic regular expression pattern
  const emailAndTagRegex = new RegExp(
    `^\\s*(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|{{\\s*eMail\\s*\\(\\s*(${escapedStrings.join(
      "|"
    )})\\s*\\)\\s*}})(?:\\s*;\\s*(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|{{\\s*eMail\\s*\\(\\s*(${escapedStrings.join(
      "|"
    )})\\s*\\)\\s*}}))*\\s*;?\\s*$`
  );

  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const [validEmail, setValidEmail] = useState(true);
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);

  const labelDict = {
    email: "Email Address/es",
    cc: "CC",
    bcc: "BCC",
  };
  const label = labelDict[emailAddressType];

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (emailAndTagRegex.test(inputValue)) {
      setValidEmail(true);
      setHasError(false);
    } else {
      setHasError(true);
      if (emailAddressType == "email") {
        dispatch(setEmailAddressError(true));
      } else if (emailAddressType == "cc") {
        dispatch(setCCError(true));
      } else if (emailAddressType == "bcc") {
        dispatch(setBCCError(true));
      }
    }
    emailInputValueCallback(inputValue);
  }, [inputValue]);

  /////////////////////////////////////////////////////////////////////////////////

  const handleItemSelect = (category, item) => {
    if (inputRef) {
      const cursorPos = inputRef.current.selectionStart;

      // Get the text before and after the cursor position
      const textBeforeCursor = inputValue.substring(0, cursorPos - 1);
      const textAfterCursor = inputValue.substring(cursorPos);

      // Create the updated value by adding the category name
      const updatedValue =
        textBeforeCursor +
        "{{ " +
        `${category}` +
        " (" +
        `${item}` +
        ") }};" +
        textAfterCursor;

      setInputValue(updatedValue);
      // Move the cursor to the end of the inserted category name
      inputRef.current.selectionStart =
        cursorPos + (item ? item.length + 1 : 0) - 5;
      inputRef.current.selectionEnd = cursorPos + (item ? item.length + 1 : 0);
      inputRef.current.focus();

      setShowDropdown(false);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCursorPosition(event.target.selectionStart);
  };

  const handleKeyDown = (event) => {
    if (event.key === "/") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="email-box">
        <input
          ref={inputRef}
          type="text"
          name="email-input"
          required
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={hasError ? "error" : "noError"}
          value={inputValue}
          placeholder='Enter email address or press "/" to select column from dropdown'
        />
        <label className="label-name"> {label}</label>
      </div>

      <div>
        {showDropdown && (
          <DropdownMenu
            inputType={"email"}
            positionTop={getCursorPos(inputRef.current).top}
            positionLeft={getCursorPos(inputRef.current).bottom + 30}
            onItemSelect={handleItemSelect}
            // setSelectedCommand={handleCommandSelect}
          />
        )}
      </div>
    </>
  );
};

export default EmailAddressInputs;
