import { friendsActions } from "../actions/friendsActions";

const initState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case friendsActions.SET_PENDING_FRIENDS_INVITATION:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    case friendsActions.SET_ONLINE_FRIENDS:
      const myOnlineFriends = state.friends.map((frnd) => {
        const f = state.onlineUsers.find(
          (onlnUser) => onlnUser.userId === frnd.friendId?._id
        );
        // cannot directly mutate state like we have did below (commented code ) in redux
        // frnd.isOnline = f ? true : false
        return { ...frnd, isOnline: f ? true : false };
      });
      return {
        ...state,
        friends: myOnlineFriends,
      };

    case friendsActions.SET_NEW_ORDER:
      const frndCopy = [...state.friends]; // creating copy of original state array

      let frndIndex;
      state.friends.forEach((frnd, i) => {
        if (frnd.friendId._id === action.frndId) {
          frndIndex = i;
          return;
        }
      });
      frndCopy.unshift(frndCopy.splice(frndIndex, 1)[0]); // mutating copy of array
      return {
        ...state,
        friends: frndCopy,
      };

    default:
      return state;
  }
};

export default reducer;
