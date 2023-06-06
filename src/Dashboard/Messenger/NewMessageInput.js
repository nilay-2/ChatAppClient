import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  directMessageHandler,
  sendGroupMessage,
  sendTypingIndicatorEvent,
} from "../../realtimeCommunication/socketConnection";
import store from "../../store/store";
import { getActions } from "../../store/actions/chatActions";
import "../../css/replyMessageDialog.css";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import b64toBlob from "b64-to-blob";
import OpenFileDialogBox from "../../shared/components/OpenFileDialogBox";
import ImageFilePreview from "../../shared/components/ImageFilePreview";
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

  const [imageName, setImageName] = useState(null);

  // input ref
  const inputRef = useRef(null);
  useEffect(() => {
    if (file || replyToMessage) inputRef.current.focus();
    else inputRef.current.blur();
  }, [file, replyToMessage]);

  const uploadFileToChat = async (data) => {
    if (file === null) return;
    if (file.size / (1024 * 1024) > 2) {
      alert("File size greater than 2MB");
      return;
    }
    try {
      const fileName = file.type.startsWith("image")
        ? `${imageName}.jpeg`
        : file.name;
      console.log(fileName);
      const fileRef = ref(storage, `ChatMedia/${fileName + v4()}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          if (url && chatType === "DIRECT") {
            data.file.fileName = fileName;
            data.file.url = url;
            directMessageHandler(data);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
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
      const data = {
        chatType,
        receiverId: chosenChatDetails.id,
        date: new Date(),
        file: {
          fileName: file?.name,
          mimeType: file?.type,
          size: `${file?.size}`,
        },
      };
      uploadFileToChat(data);
      setOpenFileUploadDialog(false);
      setFile(null);
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
      {file && file.type?.startsWith("image") ? (
        <ImageFilePreview image={file} setFile={setFile} />
      ) : (
        ""
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="file-uploader-container">
          {openFileUploadDialog ? (
            <OpenFileDialogBox setFile={setFile} setImageName={setImageName} />
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
