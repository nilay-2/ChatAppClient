import React from "react";
import "../../css/imageFileElement.css";
const ImageFileElement = ({ imgSrc }) => {
  return (
    <div className="image-file-container">
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default ImageFileElement;
