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
import { getActions } from "../../store/actions/chatActions";

const Input = styled("input")({
  backgroundColor: "#202225",
  color: "#fff",
  width: "95%",
  display: "block",
  margin: "0px auto 0px auto",
  padding: "10px",
  borderRadius: "15px",
});

function NewMessageInput({
  chosenChatDetails,
  //  changeSubmitState,
  chatType,
}) {
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && message !== "") {
      if (chatType === "DIRECT") {
        const data = {
          chatType,
          content: message,
          receiverId: chosenChatDetails.id,
          date: new Date(),
        };
        directMessageHandler(data);
        // changeSubmitState();
      } else if (chatType === "GROUP") {
        const data = {
          ...chosenChatDetails,
          date: new Date(),
          content: message,
        };
        sendGroupMessage(data);
      }
      clearInput();
    } else {
      const sender = store.getState().auth.userDetails?.name;
      const data = { ...chosenChatDetails, chatType, sender };
      sendTypingIndicatorEvent(data);
    }
  };

  const clearInput = () => {
    setMessage("");
  };

  return (
    <>
      <Input
        placeholder={
          chatType === "DIRECT"
            ? `Message @${chosenChatDetails.username}`
            : `Message @${chosenChatDetails.groupName}`
        }
        value={message}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
    </>
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
