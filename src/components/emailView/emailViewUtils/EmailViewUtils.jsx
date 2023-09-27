import axios from "axios";

export function getCursorPos(inputElement) {
  if (inputElement) {
    inputElement.addEventListener("keydown", (event) => {
      if (event.key === "/") {
        const cursorRect = inputElement.getBoundingClientRect();

        // Position the dropdown near the cursor
        const dropdownTop = cursorRect.top + cursorRect.height;
        const dropdownLeft = cursorRect.bottom + 300;

        console.log("cursorRect", cursorRect);

        return { top: dropdownTop, bottom: dropdownLeft };
      }
    });
  }

  return { top: "", bottom: "" }; // No cursor position found
}

export function TextHighlighter({ text, highlightRegex, highlightStyle }) {
  // Split the text into parts based on the regex matches
  const parts = text.split(highlightRegex);

  // Map the parts and highlight the matching portions
  return (
    <>
      {parts.map((part, index) =>
        part.match(highlightRegex) ? (
          <span key={index} style={highlightStyle}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export const emailAndTagRegex =
  /^\s*(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|{{\s*eMail\s*\(\s*[^}]*\s*\)\s*}})(?:\s*;\s*(?:[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|{{\s*eMail\s*\(\s*[^}]*\s*\)\s*}}))*\s*;?\s*$/;

// Helper function to escape special characters in strings
export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const postEmailPreview = (data) => {
  return new Promise((resolve, reject) => {
    const jsonString = JSON.stringify(data);
    axios
      .post("http://localhost:8085/email-preview", jsonString, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      })
      .then((response) => {
        // Resolve the promise with the response data
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // Reject the promise with the error
        console.error("Error:", error);
      });
  });
};
