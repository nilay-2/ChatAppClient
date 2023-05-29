import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Avatar from "../../shared/components/Avatar";
import { getDateAndTime } from "../../shared/utils/dateFormatter";
import MessageMenu from "./MessageMenu";
import "../../css/messageContainer.css";

const MainContainer = styled("div")({
  width: "98%",
  display: "flex",
  marginTop: "15px",
  flexDirection: "column",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  marginLeft: "5px",
  width: "100%",
  color: "#DEDEDE",
  display: "flex",
});

const MessageWrapper = styled("div")({
  width: "100%",
  color: "#b9bbbe",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "15px",
});

const SameAuthorMessageContent = styled("div")({
  color: "#dcddde",
  width: "98%",
  padding: "4px 0",
  display: "flex",
  justifyContent: "space-between",
});

const SameAuthorMessageText = styled("div")({
  display: "flex",
  alignItems: "center",
});

const DateBreaker = styled("div")({
  width: "45%",
  height: "2px",
  backgroundColor: "#8e9297",
});

const DateBreakContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

const BigContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "97%",
  height: "auto",
  margin: "10px 0",
});

const Message = ({
  id,
  content,
  sameAuthor,
  username,
  date,
  userId,
  sameDay,
  replyToMessage,
  changeMessageColor,
  messageReplyDetails,
  setHighlightElement,
  scrolledTo,
}) => {
  const [hover, setHover] = useState(false);

  // highligth scrolled element logic
  const highlightElement = (messageReplyDetails) => {
    setHighlightElement(messageReplyDetails);
    setTimeout(() => {
      setHighlightElement(null);
    }, 2000);
  };
  // scroll logic

  const messageRef = useRef(null);

  useEffect(() => {
    const handleSpanClick = (event) => {
      const messageId = event.target.getAttribute("data-message-id");
      const messageElement = document.getElementById(messageId);
      // console.log(messageElement, messageId);
      messageElement?.scrollIntoView({
        behavior: "smooth",
        // block: "start",
      });
    };

    messageRef.current?.addEventListener("click", handleSpanClick);

    return () => {
      messageRef.current?.removeEventListener("click", handleSpanClick);
    };
  }, []);

  //
  const setOnMouseEnter = () => {
    setHover(true);
  };

  const setOnMouseLeave = () => {
    setHover(false);
  };

  if (sameAuthor && sameDay && messageReplyDetails === undefined) {
    return (
      <SameAuthorMessageContent
        id={id}
        ref={messageRef}
        className="messageContainerHover"
        onMouseEnter={setOnMouseEnter}
        onMouseLeave={setOnMouseLeave}
        sx={
          changeMessageColor
            ? {
                backgroundColor: "#313439",
              }
            : scrolledTo
            ? { backgroundColor: "#1f2933" }
            : { backgroundColor: "" }
        }
      >
        <SameAuthorMessageText>
          <span
            style={{
              color: "#b9bbbe",
              fontSize: "12px",
              display: "block",
              width: "67px",
            }}
          >
            {hover ? getDateAndTime(date, "time") : ""}
          </span>
          {content}
        </SameAuthorMessageText>
        <span>
          {hover ? (
            <MessageMenu
              messageDetails={{ id, content, username, date }}
              userId={userId}
            />
          ) : (
            ""
          )}
        </span>
      </SameAuthorMessageContent>
    );
  }
  return (
    <>
      <BigContainer>
        {!sameDay ? (
          <DateBreakContainer>
            <DateBreaker />
            <span
              style={{
                color: "white",
                fontSize: "14px",
              }}
            >
              {getDateAndTime(date, "date")}
            </span>
            <DateBreaker />
          </DateBreakContainer>
        ) : (
          ""
        )}
      </BigContainer>
      {messageReplyDetails === undefined ? (
        <MainContainer
          ref={messageRef}
          className="messageWrapper messageContainerHover"
          id={id}
          onMouseEnter={setOnMouseEnter}
          onMouseLeave={setOnMouseLeave}
          sx={
            changeMessageColor
              ? {
                  backgroundColor: "#313439",
                }
              : scrolledTo
              ? { backgroundColor: "#1f2933" }
              : { backgroundColor: "" }
          }
        >
          <div className="message-container" style={{ display: "flex" }}>
            <div className="avatar-container">
              <Avatar username={username} />
            </div>
            <MessageWrapper>
              <Typography
                style={{ fontSize: "16px", color: "white", marginLeft: "5px" }}
              >
                {username}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#b9bbbe",
                    marginLeft: "10px",
                  }}
                >{` ${getDateAndTime(date, "dateAndTime")}`}</span>
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MessageContainer>{content}</MessageContainer>
              </div>
            </MessageWrapper>
            {hover ? (
              <MessageMenu
                messageDetails={{ id, content, username, date, userId }}
                userId={userId}
              />
            ) : (
              ""
            )}
          </div>
        </MainContainer>
      ) : (
        <MainContainer
          ref={messageRef}
          className="messageWrapper messageContainerHover"
          id={id}
          onMouseEnter={setOnMouseEnter}
          onMouseLeave={setOnMouseLeave}
          sx={
            changeMessageColor
              ? {
                  backgroundColor: "#313439",
                }
              : scrolledTo
              ? { backgroundColor: "#1f2933" }
              : { backgroundColor: "" }
          }
        >
          <div
            className="parent-message"
            style={{
              height: "30px",
              width: "55%",
              paddingLeft: "65px",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              username={messageReplyDetails.username}
              customHeight="20px"
              customWidth="20px"
              fontSize="12px"
            />
            <span
              style={{
                scrollBehavior: "smooth",
                color: "white",
                margin: "0 5px",
              }}
            >
              {messageReplyDetails.username}
            </span>

            <span
              className="messageReplyLink"
              data-message-id={messageReplyDetails?.messageId}
              onClick={() => {
                highlightElement(messageReplyDetails);
              }}
            >
              {messageReplyDetails.content?.length < 56
                ? messageReplyDetails.content
                : messageReplyDetails.content?.slice(0, 55) + "..."}
            </span>
          </div>
          <div className="message-container" style={{ display: "flex" }}>
            <div className="avatar-container">
              <Avatar username={username} />
            </div>
            <MessageWrapper>
              <Typography
                style={{ fontSize: "16px", color: "white", marginLeft: "5px" }}
              >
                {username}
                <span
                  style={{
                    fontSize: "12px",
                    color: "#b9bbbe",
                    marginLeft: "10px",
                  }}
                >{` ${getDateAndTime(date, "dateAndTime")}`}</span>
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MessageContainer>{content}</MessageContainer>
              </div>
            </MessageWrapper>
            {hover ? (
              <MessageMenu
                messageDetails={{ id, content, username, date, userId }}
                userId={userId}
              />
            ) : (
              ""
            )}
          </div>
        </MainContainer>
      )}
    </>
  );
};

export default Message;
