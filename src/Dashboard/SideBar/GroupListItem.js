import React, { useState } from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatActions";
import { joinGroup } from "../../realtimeCommunication/socketConnection";
import { readGroupNotification } from "../../realtimeCommunication/socketConnection";
function GroupListItem({ group, setChosenChatDetails, notifications }) {
  const chosenGroupDetails = (group) => {
    setChosenChatDetails(group, "GROUP");
    joinGroup(group);
  };

  const readNotificationHandler = () => {
    if (notifications.length > 0) {
      readGroupNotification(notifications);
    }
  };
  return (
    <React.Fragment>
      <div style={{ position: "relative" }} onClick={readNotificationHandler}>
        {notifications.length ? (
          <div
            className="group_chat_notification_count"
            style={{
              position: "absolute",
              border: "4px solid #202225",
              height: "25px",
              width: "25px",
              right: "-8px",
              bottom: "-8px",
              borderRadius: "50%",
              backgroundColor: "red",
              zIndex: 1,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              fontSize: "small",
            }}
          >
            {notifications.length}
          </div>
        ) : (
          ""
        )}

        <Tooltip title={group?.groupName} arrow>
          <Button
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "16px",
              margin: "0",
              padding: "0",
              minWidth: "0",
              marginTop: "10px",
              color: "#fff",
              backgroundColor: "#5865f2",
            }}
            onClick={() => {
              chosenGroupDetails(group);
            }}
          >
            {group.groupName?.slice(0, 4)}
          </Button>
        </Tooltip>
      </div>
    </React.Fragment>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GroupListItem);
