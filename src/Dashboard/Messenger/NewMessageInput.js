import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  directMessageHandler,
  sendGroupMessage,
} from "../../realtimeCommunication/socketConnection";
import { getActions } from "../../store/actions/chatActions";
import "../../css/replyMessageDialog.css";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../firebase";
import OpenFileDialogBox from "../../shared/components/OpenFileDialogBox";
import ImageFilePreview from "../../shared/components/ImageFilePreview";
import TypingIndicator from "./TypingIndicator";
import {
  sendTypingIndicatorEvent,
  stopTypingIndicator,
} from "../../realtimeCommunication/socketConnection";
import { getSocketInstance } from "../../shared/utils/socketStore";
const Input = styled("input")({
  backgroundColor: "#202225",
  color: "#fff",
  width: "95%",
  display: "block",
  padding: "10px",
  borderBottomLeftRadius: "15px",
  borderBottomRightRadius: "15px",
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const TypingIndicatorContainer = styled("div")({
  height: "30px",
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

  const [isTyping, setIsTyping] = useState(false);

  const [typerName, setTyperName] = useState("");

  // typing indicator
  useEffect(() => {
    const socket = getSocketInstance();
    socket.on("receive_typing_indicator", (data) => {
      setIsTyping(true);
      setTyperName(data);
    });

    socket.on("receive_stop_typing_indicator", (data) => {
      setIsTyping(false);
      setTyperName(null);
    });

    return () => {
      socket.off("receive_typing_indicator");

      socket.off("receive_stop_typing_indicator");
    };
  }, []);
  const handleTypingIndicator = (val) => {
    setIsTyping(val);
  };

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
      // console.log(fileName);
      const fileRef = ref(storage, `ChatMedia/${fileName + v4()}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(progress);
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
          } else if (url && chatType === "GROUP") {
            data.file.fileName = fileName;
            data.file.url = url;
            sendGroupMessage(data);
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
      if (chatType === "DIRECT") {
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
      } else if (chatType === "GROUP") {
        const data = {
          ...chosenChatDetails,
          date: new Date(),
          file: {
            fileName: file?.name,
            mimeType: file?.type,
            size: `${file?.size}`,
          },
        };
        uploadFileToChat(data);
      }
      setOpenFileUploadDialog(false);
      setFile(null);
    } else {
      sendTypingIndicatorEvent();
      setTimeout(() => {
        stopTypingIndicator();
      }, 3000);
    }
    // else {
    //   // logic for typing indicator
    //   const sender = store.getState().auth.userDetails?.name;
    //   const data = { ...chosenChatDetails, chatType, sender };
    //   sendTypingIndicatorEvent(data);
    // }
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
      <div
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
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
        <InputContainer>
          <TypingIndicatorContainer>
            {isTyping ? <TypingIndicator typerName={typerName} /> : ""}
          </TypingIndicatorContainer>
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
              borderTopRightRadius: `${
                replyToMessage !== null ? "0px" : "15px"
              }`,
              borderTopLeftRadius: `${
                replyToMessage !== null ? "0px" : "15px"
              }`,
            }}
          />
        </InputContainer>
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
