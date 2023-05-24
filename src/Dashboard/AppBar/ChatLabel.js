import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { convertToTitleCase } from "../../shared/utils/convertToTItleCase";

function ChatLabel({ chosenChatDetails, chatType }) {
  const [chatLabel, setChatLabel] = useState("");
  // this is for setting the chat lable
  useEffect(() => {
    if (chatType === "DIRECT" && chosenChatDetails !== null)
      setChatLabel("@" + convertToTitleCase(chosenChatDetails.username));
    else if (chatType === "GROUP" && chosenChatDetails !== null)
      setChatLabel("@" + convertToTitleCase(chosenChatDetails.groupName));
  }, [chosenChatDetails]);
  return (
    <Typography
      sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}
    >
      {chatLabel}
    </Typography>
  );
}

const mapStoreToState = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreToState)(ChatLabel);
