import React, { useState, useRef, useEffect } from "react";
import "../css/uploadAvatar.css";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@mui/material";
import { uploadProfilePic } from "../api";
import { canvasPreview } from "./canvasPreview";
import { getActions } from "../store/actions/authActions";
import { connect } from "react-redux";
const UploadAvatar = ({ userDetails, setProfilePic, updatePFP }) => {
  const [crop, setCrop] = useState({
    unit: "px", // Can be 'px' or '%'
    x: 50,
    y: 50,
    width: 100,
    height: 100,
  });
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // to get cropped image after cropping
  const [croppedImg, setCroppedImg] = useState(null);

  // img ref
  const imgRef = useRef(null);

  // canvas preivew ref
  const canvasPreviewRef = useRef(null);

  // to display cropped image
  useEffect(() => {
    if (
      croppedImg?.width &&
      croppedImg?.height &&
      imgRef.current &&
      canvasPreviewRef.current
    ) {
      // We use canvasPreview as it's much faster than imgPreview.
      canvasPreview(imgRef.current, canvasPreviewRef.current, croppedImg);
    }
  }, [croppedImg]);

  const handleInputHover = () => {
    setHover(true);
  };

  const handleInputLeave = () => {
    setHover(false);
  };

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;
    const imageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const res = reader.result;
      setImage(res);
    };
    reader.readAsDataURL(imageFile);
    setOpenDialog(true);
  };

  const onClose = () => {
    setImage(null);
    setOpenDialog(false);
    setCrop({
      unit: "px", // Can be 'px' or '%'
      x: 50,
      y: 50,
      width: 100,
      height: 100,
    });
    setCroppedImg(null);
  };

  // get cropped image
  const setCroppedImageHandler = (crop) => {
    setCroppedImg(crop);
  };

  // get blob of cropped image
  const getCroppedImgBlobHandler = () => {
    if (!canvasPreviewRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    canvasPreviewRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      const formData = new FormData();
      formData.append("photo", blob);
      uploadProfilePic(formData).then((res) => {
        console.log(res);
        setProfilePic(res);
        updatePFP(res); // res is the image url form firebase
      });
    });
  };

  return (
    <>
      <div className="user-pic-avatar-container">
        <img
          src={userDetails?.photo}
          alt="profile"
          className="user-pic-avatar"
        />
        <input
          type="file"
          className="user-avatar-input"
          onMouseEnter={handleInputHover}
          onMouseLeave={handleInputLeave}
          onChange={handleFileChange}
          accept="image/*"
        />
        {hover ? (
          <div className="container-content">
            <div>upload</div>
            <div>avatar</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Dialog open={openDialog} onClose={onClose}>
        <DialogTitle>Edit Image</DialogTitle>
        <DialogContent>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1 / 1}
            circularCrop={true}
            onComplete={setCroppedImageHandler}
          >
            <img
              src={image}
              alt=""
              className="preview"
              ref={imgRef}
              style={{ maxHeight: "500px" }}
            />
          </ReactCrop>
          {croppedImg && (
            <>
              <canvas
                ref={canvasPreviewRef}
                style={{
                  display: "block",
                  height: croppedImg.height,
                  width: croppedImg.width,
                  border: "2px solid red",
                  objectFit: "contain",
                }}
              />
            </>
          )}
          <div
            className="button-group"
            style={{ display: "flex", justifyContent: "end" }}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              disabled={croppedImg ? false : true}
              onClick={getCroppedImgBlobHandler}
            >
              Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

const mapActionToProsp = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProsp)(UploadAvatar);
