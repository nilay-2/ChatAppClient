import React, { useState } from "react";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import WelcomeMessage from "./WelcomeMessage";
import { connect } from "react-redux";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  minHeight: "100vh",
  height: "auto",
  display: "flex",
  flexDirection: "column",
});

function Messenger({ chosenChatDetails, chatType }) {
  return (
    <MainContainer>
      <AppBar />

      {chosenChatDetails ? (
        <>
          {chatType === "DIRECT" ? (
            <>
              <MessageHeader name={chosenChatDetails?.username} />
              <MessageContent chosenChatDetails={chosenChatDetails} />
            </>
          ) : (
            <>
              <MessageHeader name={chosenChatDetails?.groupName} />
              <MessageContent chosenChatDetails={chosenChatDetails} />
            </>
          )}
        </>
      ) : (
        <WelcomeMessage />
      )}
    </MainContainer>
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(Messenger);
