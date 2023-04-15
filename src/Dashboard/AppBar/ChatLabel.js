import React from "react";
import { connect } from "react-redux";
import { Typography } from "@mui/material";
import { convertToTitleCase } from "../../shared/utils/convertToTItleCase";

function ChatLabel({ chosenChatDetails }) {
  // console.log(chosenChatDetails);
  return (
    <Typography
      sx={{ color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}
    >
      {chosenChatDetails?.username
        ? "@" + convertToTitleCase(chosenChatDetails.username)
        : ""}
    </Typography>
  );
}

const mapStoreToState = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreToState)(ChatLabel);
