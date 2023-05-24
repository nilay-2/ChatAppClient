import { groupChatActions } from "../actions/groupChatActions";

const initState = {
  groups: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case groupChatActions.SET_GROUP_LIST:
      return {
        ...state,
        groups: action.groupList,
      };

    default:
      return state;
  }
};

export default reducer;
