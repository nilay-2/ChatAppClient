import React, { useState } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Avatar from "../../shared/components/Avatar";
import { getDateAndTime } from "../../shared/utils/dateFormatter";
import MessageMenu from "./MessageMenu";
import "../../css/messageContainer.css";

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "15px",
  // padding: "0 0 0 10px",
  // border: "2px solid blue",
});

const AvatarContainer = styled("div")({
  width: "70px",
  // border: "2px solid black",
});

const MessageContainer = styled("div")({
  // padding: "4px 0 4px 4px",
  marginLeft: "5px",
  width: "100%",
  color: "#DEDEDE",
  display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
  // border: "2px solid green",
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
  width: "97%",
  padding: "4px 0",
});

const SameAuthorMessageText = styled("div")({
  display: "flex",
  alignItems: "center",
  // paddingLeft: "52px",
  // border: "1px solid black",
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

const Message = ({ id, content, sameAuthor, username, date, sameDay }) => {
  const [hover, setHover] = useState(false);

  const setOnMouseEnter = () => {
    setHover(true);
  };

  const setOnMouseLeave = () => {
    setHover(false);
  };

  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent
        className="messageContainerHover"
        onMouseEnter={setOnMouseEnter}
        onMouseLeave={setOnMouseLeave}
      >
        <SameAuthorMessageText>
          <span
            style={{
              color: "#b9bbbe",
              fontSize: "12px",
              display: "block",
              // paddingRight: "14px",
              // paddingLeft: "10px",
              width: "67px",
            }}
          >
            {hover ? getDateAndTime(date, "time") : ""}
          </span>
          {content}
        </SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }
  return (
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
      <MainContainer
        className="messageWrapper messageContainerHover"
        id={id}
        onMouseEnter={setOnMouseEnter}
        onMouseLeave={setOnMouseLeave}
      >
        {/*<AvatarContainer className="avatarContainer">*/}
        <div className="avatar-container">
          <Avatar username={username} />
        </div>
        {/*</AvatarContainer>*/}
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
        {hover ? <MessageMenu /> : ""}
      </MainContainer>
    </BigContainer>
  );
};

export default Message;
