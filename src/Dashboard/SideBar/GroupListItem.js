import React, { useState } from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@mui/material";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/chatActions";
import { joinGroup } from "../../realtimeCommunication/socketConnection";
function GroupListItem({ group, setChosenChatDetails }) {
  const chosenGroupDetails = (group) => {
    setChosenChatDetails(group, "GROUP");
    joinGroup(group);
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GroupListItem);
