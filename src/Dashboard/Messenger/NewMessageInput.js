import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  directMessageHandler,
  sendGroupMessage,
  sendTypingIndicatorEvent,
  sendStopTypingIndicatorEvent,
} from "../../realtimeCommunication/socketConnection";
import store from "../../store/store";
import { dividerClasses } from "@mui/material";
import { getActions, setReplyToMessage } from "../../store/actions/chatActions";
import "../../css/replyMessageDialog.css";
const Input = styled("input")({
  backgroundColor: "#202225",
  color: "#fff",
  width: "95%",
  display: "block",
  margin: "0px auto 0px auto",
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

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && message !== "") {
      if (chatType === "DIRECT" && replyToMessage === null) {
        const data = {
          chatType,
          content: message,
          receiverId: chosenChatDetails.id,
          date: new Date(),
        };
        directMessageHandler(data);
      } else if (chatType === "GROUP" && replyToMessage === null) {
        const data = {
          ...chosenChatDetails,
          date: new Date(),
          content: message,
        };
        sendGroupMessage(data);
      } else if (chatType === "DIRECT" && replyToMessage !== null) {
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
        // console.log(data);
        directMessageHandler(data);
        setreplyToMessage(null);
      } else if (chatType === "GROUP" && replyToMessage !== null) {
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
      clearInput();
      return;
    } else {
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
            margin: "auto",
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
      <Input
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
