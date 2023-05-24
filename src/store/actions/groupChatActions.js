export const groupChatActions = {
  SET_GROUP_LIST: "SET_GROUP_LIST",
};

export const setGroupList = (groupList) => {
  return {
    type: groupChatActions.SET_GROUP_LIST,
    groupList,
  };
};
