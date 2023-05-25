import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import NewMessageInput from "./NewMessageInput";
import Messages from "./Messages";
import { connect } from "react-redux";
import { getRealTimeChatUpdates } from "../../realtimeCommunication/socketConnection";
import { getActions } from "../../store/actions/chatActions";
import store from "../../store/store";
const Wrapper = styled("div")({
  // flexGrow: 1,
  justifyContent: "space-between",
  // border: "2px solid green",
  boxShadow: "inset 0em 0em 1em #202225",
});
const InputWrapper = styled("div")({
  // border: "2px solid green",
});

const TypingIndicatorContainer = styled("div")({
  height: "20px",
  border: "2px solid green",
  display: "none",
});

function MessageContent({
  clearMessagesBeforeNextChat,
  chosenChatDetails,
  messages,
  getInitialChatHistory,
  getInitialGroupChatHistory,
  chatType,
}) {
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    if (chatType === "DIRECT") {
      // clear messages when chaning chats
      clearMessagesBeforeNextChat();
      // prepare data for fetching chats
      const author = store.getState().auth.userDetails?._id;
      // get chat history for the selected conversation
      getInitialChatHistory({ author, receiver: chosenChatDetails.id });
      // get real time updates for the selected conversation
      getRealTimeChatUpdates();
    } else {
      clearMessagesBeforeNextChat();
      getInitialGroupChatHistory(chosenChatDetails._id);
    }
  }, [chosenChatDetails]);

  const changeSubmitState = () => {
    setSubmit(!submit);
  };

  useEffect(() => {
    if (chatType === "DIRECT") {
      const author = store.getState().auth.userDetails?._id;
      // get chat history for the selected conversation
      getInitialChatHistory({ author, receiver: chosenChatDetails.id });
      // get real time updates for the selected conversation
      getRealTimeChatUpdates();
    } else {
      getInitialGroupChatHistory(chosenChatDetails._id);
    }
  }, [submit]);
  return (
    <Wrapper className="messageContentWrapper">
      <Messages chosenChatDetails={chosenChatDetails} messages={messages} />
      <InputWrapper>
        <TypingIndicatorContainer />
        <NewMessageInput changeSubmitState={changeSubmitState} />
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
