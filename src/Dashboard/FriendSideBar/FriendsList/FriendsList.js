import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/friendsActions";
import store from "../../../store/store";
import { getSenderNotificationCount } from "../../../shared/utils/directChatNotification";
const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
  maxHeight: "40%",
  overflow: "auto",
  marginBottom: "15px",
});

function FriendsList({ onlineFriends }) {
  return (
    <MainContainer>
      {onlineFriends?.map((f, i) => {
        return (
          <FriendsListItem
            username={f.friendId?.name}
            isOnline={f?.isOnline}
            id={f.friendId?._id}
            key={i}
            notifications={getSenderNotificationCount(
              store.getState().chat.messageNotification,
              f.friendId?._id
            )}
            activeStatus={
              store.getState().chat.chosenChatDetails?.username ===
              f.friendId?.name
                ? true
                : false
            }
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
