import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
  checkIfFriendIsOnline,
} from "../store/actions/friendsActions";
import { setMessages } from "../store/actions/chatActions";
import store from "../store/store";
let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io("http://localhost:5000/", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    // console.log("successfully connected with socket.io server");
    // console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    // console.log(pendingInvitations);
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    // console.log(friends);
    store.dispatch(setFriends(friends));
  });

  socket.on("onlineUsers", (data) => {
    const { onlineUsers } = data;
    // console.log(onlineUsers);
    store.dispatch(setOnlineUsers(onlineUsers));
    store.dispatch(checkIfFriendIsOnline());
  });
};

export const directMessageHandler = (data) => {
  // console.log(data);
  socket?.emit("directMessage", data);
};

export const getRealTimeChatUpdates = () => {
  socket?.on("realTimeChatUpdate", (data) => {
    // console.log(data);
    store.dispatch(setMessages(data));
  });
};
