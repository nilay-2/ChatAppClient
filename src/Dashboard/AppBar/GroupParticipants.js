import React, { Fragment, useState, useEffect } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import FriendsListItem from "../FriendSideBar/FriendsList/FriendsListItem";
import { Tooltip } from "@mui/material";
import store from "../../store/store";
import { onlineParticipants } from "../../shared/utils/onlineParticipants";
const GroupParticipants = ({ chosenChatDetails }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    setCurrentUserId(store.getState().auth.userDetails?._id);
  }, [openSidebar]);
  return (
    <Fragment>
      <Tooltip
        title={openSidebar ? "Hide member list" : "Show member list"}
        arrow
      >
        <IconButton
          onClick={() => {
            setOpenSidebar(!openSidebar);
          }}
        >
          <PeopleAltIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <div
        style={{
          backgroundColor: "#24272e",
          width: `${openSidebar ? "225px" : "0"}`,
          height: "calc(100% - 48px)",
          position: "absolute",
          bottom: "0",
          right: "0",
          zIndex: "10",
          boxShadow: "0px 0px 10px #232931",
          overflowX: "hidden",
          transition: "0.5s",
          overflowY: "auto",
        }}
      >
        {onlineParticipants(
          chosenChatDetails?.participants,
          store.getState().friends?.onlineUsers
        ).map((participant, i) => {
          return (
            <FriendsListItem
              disabled={true}
              username={participant?.name}
              key={i}
              id={participant?._id}
              isOnline={participant?.isOnline}
              currentUserId={currentUserId}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStateToProps)(GroupParticipants);
