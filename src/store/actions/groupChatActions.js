export const groupChatActions = {
  SET_GROUP_LIST: "SET_GROUP_LIST",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  APPEND_NOTIFICATION: "APPEND_NOTIFICATION",
};

export const setGroupList = (groupList) => {
  return {
    type: groupChatActions.SET_GROUP_LIST,
    groupList,
  };
};

export const getActions = (dispatch) => {
  return {
    setNotification: (notifications) =>
      dispatch(setNotification(notifications)),
    appendNotification: (notification) =>
      dispatch(appendNotification(notification)),
  };
};

export const setNotification = (notifications) => {
  return {
    type: groupChatActions.SET_NOTIFICATION,
    notifications,
  };
};

export const appendNotification = (notification) => {
  return {
    type: groupChatActions.APPEND_NOTIFICATION,
    notification,
  };
};
