import { groupChatActions } from "../actions/groupChatActions";

const initState = {
  groups: [],
  groupNotifications: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case groupChatActions.SET_GROUP_LIST:
      return {
        ...state,
        groups: action.groupList,
      };
    case groupChatActions.SET_NOTIFICATION:
      return {
        ...state,
        groupNotifications: action.notifications,
      };
    case groupChatActions.APPEND_NOTIFICATION:
      const updatedNotification = [...state.groupNotifications];
      updatedNotification.push(action.notification);
      return {
        ...state,
        groupNotifications: updatedNotification,
      };
    default:
      return state;
  }
};

export default reducer;
