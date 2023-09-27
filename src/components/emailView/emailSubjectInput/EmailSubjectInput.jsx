import React, { useState, useEffect, useRef } from "react";

import DropdownMenu from "../dropdownMenu/DropdownMenu"; // Your Dropdown component
import { getCursorPos } from "../emailViewUtils/EmailViewUtils";
import "./EmailSubjectInput.css";

const EmailSubjectInput = ({ subjectInputValueCallback }) => {
  const subjectRegex = /^.{1,200}$/;
  const [inputValue, setInputValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [validSubject, setValidSubject] = useState(true);
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);
  const cursorPos = { top: "", left: "" };

  /////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (subjectRegex.test(inputValue)) {
      setValidSubject(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
    subjectInputValueCallback(inputValue);
  }, [inputValue]);

  /////////////////////////////////////////////////////////////////////////////////

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
        ") }}" +
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

  /////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="email-subject-box">
        <input
          ref={inputRef}
          type="text"
          name="email-subject-input"
          required
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={hasError ? "error" : "noError"}
          value={inputValue}
          placeholder='Enter subject or press "/" to select column from dropdown'
        />
        <label> Subject</label>
      </div>

      <div>
        {showDropdown && (
          <DropdownMenu
            inputType={"subject"}
            positionTop={cursorPos.top}
            positionLeft={cursorPos.left}
            onItemSelect={handleItemSelect}
          />
        )}
      </div>
    </>
  );
};

export default EmailSubjectInput;
