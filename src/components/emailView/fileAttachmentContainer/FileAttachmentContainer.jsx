import React, { useState } from "react";
import "./FileAttachmentContainer.css";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFilePdf,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileImage,
  faFileAudio,
  faFileVideo,
  faFileArchive,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  addAttachment,
  removeAttachment,
} from "../../../redux/slices/fileAttachmentSlice";
import { truncateStringBeforeDot } from "./FileAttachmentContainerUtils";

const FileAttachmentContainer = () => {
  const dispatch = useDispatch();
  const attachedFiles = useSelector((state) => state.fileAttachment);

  const handleFileChange = async (event) => {
    const newFiles = event.target.files;

    // Save the new files to the array.
    const filesArray = saveFilesToArray(newFiles);

    // Set the state of the files array.
    dispatch(addAttachment(filesArray));
  };

  // This function will save the uploaded files in an array.
  const saveFilesToArray = (files) => {
    const filesArray = [];
    for (const file of files) {
      // Read the contents of the file.
      const fileContents = file.arrayBuffer();
      const fileObjectURL = window.URL.createObjectURL(file);

      // Add the file contents to the array.
      filesArray.push({
        name: file.name,
        type: file.type,
        objectURL: fileObjectURL,
      });
    }

    return filesArray;
  };

  const handleFileRemove = (file) => {
    dispatch(removeAttachment(file));

    // Find the file's Object URL in your files array
    const objectURLToRemove = attachedFiles.find((f) => f === file)?.objectURL;
    // Revoke the file's Object URL if it exists
    if (objectURLToRemove) {
      window.URL.revokeObjectURL(objectURLToRemove);
    }

    console.log("filesArray-removed", file);
  };

  const renderFileList = () => {
    return attachedFiles.map((file) => {
      const fileTypeIcon = {
        "application/pdf": faFilePdf,
        "application/msword": faFileWord,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          faFileWord,
        "application/vnd.ms-excel": faFileExcel,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          faFileExcel,
        "application/vnd.ms-powerpoint": faFilePowerpoint,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          faFilePowerpoint,
        "image/jpeg": faFileImage,
        "image/png": faFileImage,
        "image/svg": faFileImage,
        "image/gif": faFileImage,
        "image/bmp": faFileImage,
        "audio/mpeg": faFileAudio,
        "audio/wav": faFileAudio,
        "audio/m4a": faFileAudio,
        "video/mp4": faFileVideo,
        "video/avi": faFileVideo,
        "video/mov": faFileVideo,
        "video/wmv": faFileVideo,
        "application/zip": faFileArchive,
        "application/x-rar-compressed": faFileArchive,
        "application/x-7z-compressed": faFileArchive,
      }[file.type];

      return (
        <div key={file.name} className="file-item">
          <span className="file-icon">
            <FontAwesomeIcon icon={fileTypeIcon ?? faFile} size="3x" />
          </span>
          <span className="file-title">
            {truncateStringBeforeDot(file.name, 20)}
          </span>

          <span className="remove" onClick={() => handleFileRemove(file)}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        </div>
      );
    });
  };

  return (
    <div className="file-attach-container">
      <input type="file" multiple onChange={handleFileChange} />
      <div className="file-list">{renderFileList()}</div>
    </div>
  );
};

export default FileAttachmentContainer;
