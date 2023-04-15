import React, { useEffect } from "react";
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
});

function MessageContent({
  clearMessagesBeforeNextChat,
  chosenChatDetails,
  messages,
  getInitialChatHistory,
}) {
  useEffect(() => {
    // clear messages when chaning chats
    clearMessagesBeforeNextChat();
    // prepare data for fetching chats
    const author = store.getState().auth.userDetails?._id;
    // get chat history for the selected conversation
    getInitialChatHistory({ author, receiver: chosenChatDetails.id });
    // get real time updates for the selected conversation
    getRealTimeChatUpdates();
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages chosenChatDetails={chosenChatDetails} messages={messages} />
      <NewMessageInput />
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
