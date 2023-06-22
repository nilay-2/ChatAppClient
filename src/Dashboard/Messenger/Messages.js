import React, { useRef, useCallback, useState, useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Message from "./Message";
import { getDateAndTime } from "../../shared/utils/dateFormatter";
const MainContainer = styled("div")({
  height: "400px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

function Messages({ chosenChatDetails, messages, replyToMessage, chatType }) {
  const bottomRef = useRef(null);

  const [highlightElement, setHighlightElement] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
    // bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <MainContainer>
      {messages !== undefined
        ? messages?.map((msg, i) => {
            const sameAuthor =
              i > 0 &&
              messages[i].author?._id.toString() ===
                messages[i - 1].author?._id.toString()
                ? true
                : false;
            // console.log(sameAuthor);
            const sameDay =
              i > 0 &&
              getDateAndTime(messages[i]?.date, "date") ===
                getDateAndTime(messages[i - 1]?.date, "date")
                ? true
                : false;

            return (
              <Message
                key={msg?._id}
                id={msg?._id}
                userId={msg.author?._id}
                username={msg.author?.name}
                content={msg?.content}
                sameAuthor={sameAuthor}
                date={msg?.date}
                sameDay={sameDay}
                replyToMessage={replyToMessage}
                changeMessageColor={
                  replyToMessage?.id === msg?._id ? true : false
                }
                file={msg?.file}
                messageReplyDetails={msg?.messageReplyDetails}
                setHighlightElement={setHighlightElement}
                scrolledTo={
                  highlightElement?.messageId === msg?._id ? true : false
                }
              />
            );
          })
        : ""}
      <div id={"scrollableDiv"} ref={bottomRef}></div>
    </MainContainer>
  );
}

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(Messages);
