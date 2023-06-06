import React, { useState } from "react";
import "../../css/fileMessageElement.css";
import { byteConversion } from "../utils/fileBytesConversion";
import { IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import fileDownload from "js-file-download";
import ImageFileElement from "./ImageFileElement";
const ext = [
  "pdf",
  "jsx",
  "js",
  "docx",
  "txt",
  "json",
  "exe",
  "css",
  "doc",
  "xlsx",
];

const MessageElementFile = ({ file }) => {
  const [disable, setDisable] = useState(false);
  // function to download file
  const downloadFile = (url) => {
    console.log(url);
    setDisable(true);
    const xhr = new XMLHttpRequest(); // using xhr to download files as mentioned in the firebase documentation
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);
      if (blob) {
        setDisable(false);
        fileDownload(blob, file.fileName);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  };

  const fileExtension = file.fileName?.split(".")[1];
  return (
    <div className="file-message-element">
      <div className="downloadBtn">
        <IconButton
          sx={{ backgroundColor: "#3b3c3f" }}
          disabled={disable}
          onClick={() => {
            downloadFile(file.url);
          }}
        >
          <FileDownloadIcon sx={{ color: "white" }} />
        </IconButton>
      </div>
      {!file.mimeType.startsWith("image") ? (
        <>
          <div className="file-icon">
            {ext.includes(fileExtension) ? (
              <i className={`fa-3x bi bi-filetype-${fileExtension}`}></i>
            ) : (
              <i className="fa-3x bi bi-file-earmark"></i>
            )}
          </div>
          <div className="file-details">
            <p className="file-name">{file.fileName}</p>
            <p className="file-size">{byteConversion(file.size)}</p>
          </div>
        </>
      ) : (
        <ImageFileElement imgSrc={file.url} />
      )}
    </div>
  );
};

export default MessageElementFile;
