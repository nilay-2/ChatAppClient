import React, { useEffect } from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/friendsActions";
import store from "../../../store/store";
import {
  setOnlineUsers,
  checkIfFriendIsOnline,
} from "../../../store/actions/friendsActions";
const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
  maxHeight: "40%",
  overflow: "auto",
  marginBottom: "15px",
});

function FriendsList({ friends, onlineFriends, onlineUsers }) {
  // useEffect(() => {
  //   store.dispatch(setOnlineUsers(onlineUsers));
  //   store.dispatch(checkIfFriendIsOnline());
  // }, [onlineUsers]);

  return (
    <MainContainer>
      {onlineFriends?.map((f) => {
        return (
          <FriendsListItem
            username={f.friendId.name}
            isOnline={f?.isOnline}
            id={f.friendId._id}
            key={f.friendId._id}
          />
        );
      })}
    </MainContainer>
  );
}

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(FriendsList);
