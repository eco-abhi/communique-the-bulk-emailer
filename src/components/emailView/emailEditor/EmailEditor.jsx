import "./EmailEditor.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { HTMLEmailContent } from "../htmlEmailContent/HTMLEmailContent";
import { Editor } from "@tinymce/tinymce-react";
import DropdownMenu from "../dropdownMenu/DropdownMenu"; // Your Dropdown component

const EmailEditor = ({ emailInputValueCallback }) => {
  const dropdownRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const selectedEmail = useSelector((state) => state.getSelectedEmailType);

  const emailHtmlContent =
    HTMLEmailContent["Chargeback Emails"][selectedEmail]["htmlContent"];
  const [editorHtml, setEditorHtml] = useState(emailHtmlContent);

  const editorConfig = {
    apiKey: "ln3qr5g0qgzf6xu1s16smwnap5h423aue6h8kmhfnprbflrb", // Replace with your TinyMCE API key
    height: 500,
    toolbar:
      "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    content_style: "body { background-color: #ffffff; }",
    placeholder: "Start your email here",
    setup: (editor) => {
      editor.on("keydown", (event) => {
        if (event.key === "/") {
          setShowDropdown(true);
        } else {
          console.log("no");
          setShowDropdown(false);
        }
      });
    },
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const handleDropdownClick = (event) => {
      if (
        dropdownRef.current &&
        editorContainerRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleDropdownClick);

    return () => {
      window.removeEventListener("click", handleDropdownClick);
    };
  }, [dropdownRef]);

  useEffect(() => {
    emailInputValueCallback(editorHtml);
  }, [editorHtml]);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  // Add a ref callback to initialize dropdownRef
  const assignDropdownRef = (element) => {
    dropdownRef.current = element;
    editorContainerRef.current = element;
  };

  const handleCommandSelect = (command) => {
    setSelectedCommand(command);

    setShowDropdown(false);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="editor-container" ref={assignDropdownRef}>
        <Editor
          value={editorHtml}
          init={editorConfig}
          onEditorChange={(content, editor) => {
            setEditorHtml(content);
          }}
        />
      </div>

      {showDropdown && (
        <span
          ref={assignDropdownRef}
          style={{
            position: "relative",
            top: "-200px",
            left: "20px",
            backgroundColor: "#FF0000",
            zIndex: 10000, // Set a high value for z-index
          }}
        >
          <DropdownMenu
            selectedCommand={selectedCommand}
            setSelectedCommand={handleCommandSelect}
            positionTop={"-100px"}
            positionLeft={"0px"}
            style={{
              backgroundColor: "#FF0000",
            }}
          />
        </span>
      )}
    </>
  );
};

export default EmailEditor;
