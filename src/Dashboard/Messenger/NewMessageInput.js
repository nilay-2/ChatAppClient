import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  directMessageHandler,
  sendGroupMessage,
  sendTypingIndicatorEvent,
  // sendStopTypingIndicatorEvent,
} from "../../realtimeCommunication/socketConnection";
import store from "../../store/store";
// import { dividerClasses } from "@mui/material";
import { getActions, setReplyToMessage } from "../../store/actions/chatActions";
import "../../css/replyMessageDialog.css";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import fileDownload from "js-file-download";
import b64toBlob from "b64-to-blob";
const Input = styled("input")({
  backgroundColor: "#202225",
  color: "#fff",
  width: "95%",
  display: "block",
  padding: "10px",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
});

function NewMessageInput({
  chosenChatDetails,
  chatType,
  replyToMessage,
  setreplyToMessage,
}) {
  const [message, setMessage] = useState("");

  const [file, setFile] = useState(null);

  const [openFileUploadDialog, setOpenFileUploadDialog] = useState(false);

  const [bufferData, setBufferData] = useState(null);

  const [url, setUrl] = useState(null);

  // console.log(file);
  // input ref
  const inputRef = useRef(null);
  useEffect(() => {
    if (file || replyToMessage) inputRef.current.focus();
  }, [file, replyToMessage]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // let b64;
    // let mime;
    // let fileData;
    // const reader = new FileReader();
    // reader.readAsDataURL(e.tar);
    // reader.onload = function () {
    //   var mimeType = reader.result.match(
    //     /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,/
    //   )[1];
    //   var base64Data = reader.result.split(",");
    //   b64 = base64Data[1];
    //   mime = mimeType;
    //   console.log("only the b64", b64);
    //   console.log("only the mime", mime);
    //   const blob = b64toBlob(b64, mime); // runs asynchronously
    //   console.log(blob);
    //   setBufferData(blob);
    //   // fileDownload(blob, `${file.name}`);
    // };
    // reader.onerror = function (error) {
    //   console.log("Error: ", error);
    // };
  };

  const uploadFileToChat = async () => {
    if (file === null) return;
    const fileRef = ref(storage, `ChatMedia/${file.name + v4()}`);
    // uploadBytes(fileRef, file).then(() => {
    //   console.log("file uploaded");
    //   console.log(getDownloadURL(fileRef));
    // });
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log(url);
    setUrl(url);
    // const proxyUrl = "http://localhost:5000/proxy";
    // const proxyUrl = "https://chatsphereserver.up.railway.app";

    // const modifiedUrl = url.replace(
    //   /^https:\/\/firebasestorage\.googleapis\.com/,
    //   ""
    // );
    // // console.log(modifiedUrl);
    const xhr = new XMLHttpRequest(); // using xhr
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
      console.log(blob);
      fileDownload(blob, file.name);
    };

    xhr.open("GET", url);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();

    // axios // using axios
    //   .get(`${proxyUrl}${modifiedUrl}`, { responseType: "blob" })
    //   .then((response) => {
    //     const blob = response.data;
    //     console.log(blob);
    //     fileDownload(blob, file.name); // fileDownload() is npm package
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const fileUploadDialogHandler = () => [
    setOpenFileUploadDialog(!openFileUploadDialog),
  ];

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && message !== "" && !file) {
      if (chatType === "DIRECT") {
        if (replyToMessage === null) {
          const data = {
            chatType,
            content: message,
            receiverId: chosenChatDetails.id,
            date: new Date(),
          };
          directMessageHandler(data);
        } else if (replyToMessage !== null) {
          const data = {
            chatType,
            content: message,
            receiverId: chosenChatDetails.id,
            date: new Date(),
            messageReplyDetails: {
              messageId: replyToMessage?.id,
              content: replyToMessage?.content,
              username: replyToMessage?.username,
            },
          };
          directMessageHandler(data);
          setreplyToMessage(null);
        }
      }
      if (chatType === "GROUP") {
        if (replyToMessage === null) {
          const data = {
            ...chosenChatDetails,
            date: new Date(),
            content: message,
          };
          sendGroupMessage(data);
        } else if (replyToMessage !== null) {
          const data = {
            ...chosenChatDetails,
            date: new Date(),
            content: message,
            messageReplyDetails: {
              messageId: replyToMessage?.id,
              content: replyToMessage?.content,
              username: replyToMessage?.username,
            },
          };
          sendGroupMessage(data);
          setreplyToMessage(null);
        }
      }
      clearInput();
      return;
    } else if (e.key === "Enter" && file) {
      uploadFileToChat();
      setOpenFileUploadDialog(false);
      // setFile(null);
    } else {
      // logic for typing indicator
      const sender = store.getState().auth.userDetails?.name;
      const data = { ...chosenChatDetails, chatType, sender };
      sendTypingIndicatorEvent(data);
    }
  };

  const clearInput = () => {
    setMessage("");
  };

  const removeReplyToMessageHandler = () => {
    setreplyToMessage(null);
  };

  return (
    <div>
      {replyToMessage !== null ? (
        <div
          style={{
            height: "24px",
            width: "95%",
            marginLeft: "50px",
            backgroundColor: "black",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            color: "white",
            paddingLeft: "15px",
            paddingRight: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>
            Replying to <strong>{replyToMessage?.username}</strong>
          </span>
          <span
            className="dialog-close-btn"
            onClick={removeReplyToMessageHandler}
          >
            <i className="bi bi-x"></i>
          </span>
        </div>
      ) : (
        ""
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="file-uploader-container">
          {openFileUploadDialog ? (
            <div className="file-uploader">
              <input type="file" id="file" onChange={handleFileChange} />
              <label htmlFor="file" id="file-label">
                <i className="bi bi-file-earmark-arrow-up-fill file-input-icon"></i>
                <span className="file-input-content">Upload a File</span>
              </label>
            </div>
          ) : (
            ""
          )}
          <IconButton onClick={fileUploadDialogHandler}>
            <AddCircleIcon
              sx={{ color: "white", height: "35px", width: "35px" }}
            />
          </IconButton>
        </div>
        <Input
          ref={inputRef}
          placeholder={
            chatType === "DIRECT"
              ? `Message @${chosenChatDetails.username}`
              : `Message @${chosenChatDetails.groupName}`
          }
          value={message}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          sx={{
            borderTopRightRadius: `${replyToMessage !== null ? "0px" : "15px"}`,
            borderTopLeftRadius: `${replyToMessage !== null ? "0px" : "15px"}`,
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(NewMessageInput);
