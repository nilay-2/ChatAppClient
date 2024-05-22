import React from "react";
import { Button } from "@mui/material";
import Avatar from "../../../shared/components/Avatar";
import { Typography } from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import { getActions } from "../../../store/actions/chatActions";
import { connect } from "react-redux";
import ChatNotify from "./ChatNotify";
import { readDirectChatNotification } from "../../../realtimeCommunication/socketConnection";
function FriendsListItem({
  disabled = false,
  isOnline,
  username,
  id,
  setChosenChatDetails,
  currentUserId = "",
  setSelectedItem,
  activeStatus,
  notifications = [],
}) {
  const handleChatDetails = () => {
    setSelectedItem(id);
    setChosenChatDetails({ id, username }, "DIRECT");
    // console.log(notifications);
    readDirectChatNotification(notifications);
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
        <div
          className="avatar-container"
          style={{
            borderRadius: "30%",
            height: "fit-content",
            width: "fit-content",
            position: "relative",
          }}
        >
          <Avatar username={username} customHeight="44px" customWidth="44px" />
          {isOnline ? <OnlineIndicator /> : ""}
        </div>
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
        {notifications.length ? (
          <ChatNotify notifications={notifications} />
        ) : (
          ""
        )}
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
