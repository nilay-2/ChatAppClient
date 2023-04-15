import React, { useRef, useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
// import MessageHeader from "./MessageHeader";
import Message from "./Message";
// import dummyMessages from "./dummyMessages";
import { getDateAndTime } from "../../shared/utils/dateFormatter";
const MainContainer = styled("div")({
  height: "420px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

function Messages({ chosenChatDetails, messages }) {
  // scroll to the bottom when the height of the box overflows to display the last message
  // console.log("date for first message: ", messages[0]?.date);
  // console.log("date of previous element", messages[-1]?.date);
  // if (messages[0]?.date === messages[-1]?.date) console.log(true);
  // else console.log(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <MainContainer>
      {/*<MessageHeader name={chosenChatDetails?.username} />*/}
      {messages.map((msg, i) => {
        // console.log(msg.date);
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
        // console.log(sameDay);
        return (
          <Message
            key={i}
            id={msg._id}
            username={msg.author.name}
            content={msg.content}
            sameAuthor={sameAuthor}
            date={msg?.date}
            sameDay={sameDay}
          />
        );
      })}
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
