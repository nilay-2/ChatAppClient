import { openAlertMessage } from "./alertActions";
import * as api from "../../api";
export const friendsActions = {
  SET_FRIENDS: "FRIENDS.SET_FRIENDS",
  SET_PENDING_FRIENDS_INVITATION: "FRIENDS.SET_PENDING_FRIENDS_INVITATION",
  SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
  SET_ONLINE_FRIENDS: "FRIENDS.SET_ONLINE_FRIENDS",
  SET_NEW_ORDER: "FRIENDS.SET_NEW_ORDER",
};

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) => {
      dispatch(sendFriendInvitation(data, closeDialogHandler));
    },
    acceptFriendInvitation: (data) => {
      dispatch(acceptFriendInvitation(data));
    },
    rejectFriendInvitation: (data) => {
      dispatch(rejectFriendInvitation(data));
    },
    getFriends: () => {
      dispatch(getFriendsAction());
    },
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  // console.log(pendingFriendsInvitations);
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATION,
    pendingFriendsInvitations,
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

export const changeFrndsListOrder = (frndId) => {
  return {
    type: friendsActions.SET_NEW_ORDER,
    frndId,
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);
    if (response.error) {
      // console.log(response);
      dispatch(openAlertMessage(response.exception?.response?.data.message));
    } else {
      // console.log(response);
      dispatch(openAlertMessage(response.data?.message));
      closeDialogHandler();
    }
  };
};

const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data);
    // console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data.message));
    } else {
      dispatch(openAlertMessage(response.data?.message));
    }
  };
};

const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data);
    // console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data.message));
    } else {
      dispatch(openAlertMessage(response.data?.message));
    }
  };
};

const getFriendsAction = () => {
  return async (dispatch) => {
    const response = await api.getFriends();

    if (response.error) {
      dispatch(openAlertMessage(response.exception?.response?.data.message));
    } else {
      const friends = response.data.friends;
      // console.log(friends);
      dispatch(setFriends(friends));
    }
  };
};

export const checkIfFriendIsOnline = () => {
  return {
    type: friendsActions.SET_ONLINE_FRIENDS,
  };
};
