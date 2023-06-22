import React, { useEffect, Fragment } from "react";
import { styled } from "@mui/system";
import NewMessageInput from "./NewMessageInput";
import Messages from "./Messages";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatActions";
import store from "../../store/store";
// import Loading from "../../shared/components/Loading";
import ChatLoading from "../../shared/components/ChatLoading";
const Wrapper = styled("div")({
  flexGrow: 1,
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
  // typingIndicator,
  isLoading,
}) {
  useEffect(() => {
    if (chatType === "DIRECT") {
      clearMessagesBeforeNextChat(true);
      const author = store.getState().auth.userDetails?._id;
      getInitialChatHistory({ author, receiver: chosenChatDetails.id });
    } else if (chatType === "GROUP") {
      clearMessagesBeforeNextChat(true);
      const id = chosenChatDetails?._id;
      getInitialGroupChatHistory(id);
    }
  }, [chosenChatDetails, chatType]);

  return (
    <Fragment>
      {isLoading ? (
        <div style={{ overflowY: "auto" }}>
          {[1, 2, 3, 4].map((val) => (
            <ChatLoading key={val} />
          ))}
        </div>
      ) : (
        <Wrapper className="messageContentWrapper">
          <Messages chosenChatDetails={chosenChatDetails} messages={messages} />
          <InputWrapper>
            {/*<TypingIndicatorContainer>
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
              </TypingIndicatorContainer>*/}
            <NewMessageInput />
          </InputWrapper>
        </Wrapper>
      )}
    </Fragment>
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
