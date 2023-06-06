import React from "react";
import "../../css/fileMessageElement.css";
const OpenFileDialogBox = ({ setFile, setImageName }) => {
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setImageName(e.target.files[0].name.split(".")[0]);
  };
  return (
    <div className="file-uploader">
      <input type="file" id="file" onChange={handleFileChange} />
      <label htmlFor="file" id="file-label">
        <i className="bi bi-file-earmark-arrow-up-fill file-input-icon"></i>
        <span className="file-input-content">Upload a File</span>
      </label>
    </div>
  );
};

export default OpenFileDialogBox;
