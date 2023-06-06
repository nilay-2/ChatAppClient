import React, { useState, useEffect } from "react";
import "../../css/imageFilePreview.css";
import b64toBlob from "b64-to-blob";
let WIDTH;
const ImageFilePreview = ({ image, setFile, setDisable }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [imgHeight, setImgHeight] = useState(null);
  const [imgWidth, setImgWidth] = useState(null);
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = function () {
      setImgSrc(reader.result);
    };
    reader.readAsDataURL(image);
  }, [image]);

  const setImgPreviewSize = (e) => {
    if (e.target.height > e.target.width) {
      WIDTH = 400;
    } else if (e.target.width > e.target.height) {
      WIDTH = 850;
    } else WIDTH = null;
    if (WIDTH) {
      const canvas = document.createElement("canvas");
      const ratio = WIDTH ? WIDTH / e.target.width : 1;
      canvas.width = WIDTH ? WIDTH : e.target.width;
      canvas.height = e.target.height * ratio;

      const context = canvas.getContext("2d");
      context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
      const resizedUrl = context.canvas.toDataURL("image/jpeg", 100);
      setImgSrc(context.canvas.toDataURL("image/jpeg", 100));
      setImgHeight(canvas.height);
      setImgWidth(canvas.width);
      const blob = b64toBlob(resizedUrl.split(",")[1], "image/jpeg");
      setFile(blob);
    }
  };

  return (
    <div className="file-preview-container" style={{ height: imgHeight }}>
      <img
        className="img-preview"
        src={imgSrc}
        alt=""
        onLoad={setImgPreviewSize}
        height={imgHeight}
      />
    </div>
  );
};

export default ImageFilePreview;
