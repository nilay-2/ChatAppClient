import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import NewMessageInput from "./NewMessageInput";
import Messages from "./Messages";
import { connect } from "react-redux";
import { getRealTimeChatUpdates } from "../../realtimeCommunication/socketConnection";
import { getActions } from "../../store/actions/chatActions";
import { Typography } from "@mui/material";
import store from "../../store/store";
import Loading from "../../shared/components/Loading";

const Wrapper = styled("div")({
  // flexGrow: 1,
  justifyContent: "space-between",
});
const InputWrapper = styled("div")({});

const TypingIndicatorContainer = styled("div")({
  height: "30px",
});

function MessageContent({
  clearMessagesBeforeNextChat,
  chosenChatDetails,
  messages,
  getInitialChatHistory,
  getInitialGroupChatHistory,
  chatType,
  typingIndicator,
}) {
  // const [submit, setSubmit] = useState(false);

  // useEffect(() => {
  //   if (chatType === "DIRECT") {
  //     // clear messages when chaning chats
  //     clearMessagesBeforeNextChat();
  //     // prepare data for fetching chats
  //     const author = store.getState().auth.userDetails?._id;
  //     // get chat history for the selected conversation
  //     getInitialChatHistory({ author, receiver: chosenChatDetails.id });
  //     // get real time updates for the selected conversation
  //     getRealTimeChatUpdates();
  //   } else {
  //     clearMessagesBeforeNextChat();
  //     getInitialGroupChatHistory(chosenChatDetails._id);
  //   }
  // }, [chosenChatDetails]);

  useEffect(() => {
    if (chatType === "DIRECT") {
      clearMessagesBeforeNextChat();
      const author = store.getState().auth.userDetails?._id;
      getInitialChatHistory({ author, receiver: chosenChatDetails.id });
    } else if (chatType === "GROUP") {
      clearMessagesBeforeNextChat();
      const id = chosenChatDetails?._id;
      getInitialGroupChatHistory(id);
    }
  }, [chosenChatDetails]);

  // const changeSubmitState = () => {
  //   setSubmit(!submit);
  // };

  // useEffect(() => {
  //   if (chatType === "DIRECT") {
  //     const author = store.getState().auth.userDetails?._id;
  //     // get chat history for the selected conversation
  //     getInitialChatHistory({ author, receiver: chosenChatDetails.id });
  //     // get real time updates for the selected conversation
  //     getRealTimeChatUpdates();
  //   } else {
  //     getInitialGroupChatHistory(chosenChatDetails._id);
  //   }
  // }, [submit]);

  return (
    <Wrapper className="messageContentWrapper">
      <Messages chosenChatDetails={chosenChatDetails} messages={messages} />
      <InputWrapper>
        <TypingIndicatorContainer>
          {typingIndicator.toggleState ? (
            <div
              style={{
                display: "flex",
                height: "auto",
                width: "auto",
              }}
            >
              <Loading />
              <div style={{ width: "30px" }}></div>
              <div style={{ color: "white" }}>
                <span style={{ fontWeight: "bold" }}>
                  {typingIndicator?.sender}
                </span>{" "}
                <span>is typing...</span>
              </div>
            </div>
          ) : (
            ""
          )}
        </TypingIndicatorContainer>
        <NewMessageInput
        // changeSubmitState={changeSubmitState}
        />
      </InputWrapper>
    </Wrapper>
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

export default connect(mapStateToProps, mapActionsToProps)(MessageContent);
