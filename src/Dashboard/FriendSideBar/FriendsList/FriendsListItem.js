import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import { Typography } from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import { getActions } from "../../../store/actions/chatActions";
import { connect } from "react-redux";
function FriendsListItem({
  disabled = false,
  isOnline,
  username,
  id,
  setChosenChatDetails,
  currentUserId = "",
  activeStatus,
}) {
  const handleChatDetails = () => {
    setChosenChatDetails({ id, username }, "DIRECT");
  };

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={handleChatDetails}
        id={id}
        style={{
          width: "100%",
          height: "42px",
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          color: "black",
          position: "relative",
          backgroundColor: `${activeStatus ? "#2b3945" : ""}`,
        }}
      >
        <Avatar username={username} />
        <Typography
          style={{
            marginLeft: "7px",
            fontWeight: "700",
            color: "#8e9297",
          }}
          variant="subtitle1"
          align="left"
        >
          {id === currentUserId ? "You" : username}
        </Typography>
        {isOnline ? <OnlineIndicator /> : ""}
      </Button>
    </div>
  );
}

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps, mapActionToProps)(FriendsListItem);
