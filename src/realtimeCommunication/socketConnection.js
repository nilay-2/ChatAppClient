import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
  checkIfFriendIsOnline,
} from "../store/actions/friendsActions";
import {
  appendMessage,
  setMessages,
  toggleTypingIndicator,
} from "../store/actions/chatActions";
import store from "../store/store";
import { setGroupList } from "../store/actions/groupChatActions";
let socket = null;

// const backendurl = 'http://localhost:5000/'
const backendurl = "https://chatvibeserver.vercel.app/";

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io(backendurl, {
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

  socket.on("groupList", ({ groups }) => {
    // console.log(groups);
    store.dispatch(setGroupList(groups));
  });

  socket.on("realTimeChatUpdate", (data) => {
    console.log(data);
    store.dispatch(appendMessage(data));
  });

  socket.on("recieve_group_message", (groupChatMessages) => {
    console.log(groupChatMessages);
    store.dispatch(appendMessage(groupChatMessages));
  });

  socket.on("received_typing_indicator_event", (senderDetails) => {
    // console.log(senderDetails);
    if (store.getState().chat.typingIndicator.toggleState !== true) {
      store.dispatch(toggleTypingIndicator(senderDetails, true));
    }
    // console.log("hello");
    setTimeout(() => {
      store.dispatch(toggleTypingIndicator(senderDetails, false));
      // console.log("typing stopped");
    }, 2000);
  });
};

export const directMessageHandler = (data) => {
  // console.log(data);
  socket?.emit("directMessage", data);
};

export const getRealTimeChatUpdates = () => {
  socket?.on("realTimeChatUpdate", (data) => {
    // console.log(data);
    store.dispatch(appendMessage(data));
    // store.dispatch(setMessages(data));
  });
};

export const joinGroup = (data) => {
  // console.log(data);
  socket?.emit("join_group", data);
};

export const sendGroupMessage = (data) => {
  // console.log(data);
  socket?.emit("send_group_message", data);
};

export const sendTypingIndicatorEvent = (data) => {
  socket?.emit("send_typing_indicator_event", data);
};

export const sendStopTypingIndicatorEvent = (data) => {
  socket?.emit("send_stop_typing_indicator_event", data);
};
