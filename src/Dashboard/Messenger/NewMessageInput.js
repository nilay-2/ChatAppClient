import React, { useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import {
  directMessageHandler,
  sendGroupMessage,
} from "../../realtimeCommunication/socketConnection";
const Input = styled("input")({
  backgroundColor: "#202225",
  color: "#fff",
  width: "95%",
  display: "block",
  margin: "15px auto 0px auto",
  padding: "10px",
  borderRadius: "15px",
});

function NewMessageInput({ chosenChatDetails, changeSubmitState, chatType }) {
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (chatType === "DIRECT") {
        const data = {
          chatType,
          content: message,
          receiverId: chosenChatDetails.id,
          date: new Date(),
        };
        directMessageHandler(data);
        changeSubmitState();
      } else if (chatType === "GROUP") {
        const data = {
          ...chosenChatDetails,
          date: new Date(),
          content: message,
        };
        sendGroupMessage(data);
      }
      clearInput();
    }
  };

  const clearInput = () => {
    setMessage("");
  };

  return (
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
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(NewMessageInput);
