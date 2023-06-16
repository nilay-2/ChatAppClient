import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
  checkIfFriendIsOnline,
} from "../store/actions/friendsActions";
import {
  appendMessage,
  toggleTypingIndicator,
  setInvtNotifications,
  setMessageNotification,
  appendMessageNotification,
} from "../store/actions/chatActions";
import store from "../store/store";
import { setGroupList } from "../store/actions/groupChatActions";
import { backEndUrl } from "../shared/utils/url";
let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io(backEndUrl, {
    withCredentials: true,
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
    // if user has not selected any chat
    if (!store.getState().chat.chosenChatDetails) {
      // console.log(data);
      sendChatNotification(socket, data);
    }
    // if user is chatting with someone else
    if (
      store.getState().chat.chosenChatDetails &&
      store.getState().chat.chosenChatDetails?.id !== data.author?._id && // this will give notification to both the sender and the receiver which we dont want
      store.getState().auth.userDetails?._id !== data.author?._id // author and the other logged-in person should be different or else both will receive the notification
    ) {
      // console.log(data);
      sendChatNotification(socket, data);
    }
    store.dispatch(appendMessage(data));
  });

  socket.on("recieve_group_message", (groupChatMessages) => {
    // console.log(groupChatMessages);
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

  socket.on("send_notification", (notifications) => {
    store.dispatch(setInvtNotifications(notifications));
  });
  // receive chat notification
  socket.on("receive_chat_notification", (chatNotification) => {
    // console.log(chatNotification);
    store.dispatch(appendMessageNotification(chatNotification));
  });

  socket.on("initial_chat_notification_update", (chatNotification) => {
    // console.log(chatNotification);
    store.dispatch(setMessageNotification(chatNotification));
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

// send chat notification
const sendChatNotification = (socket, data) => {
  socket.emit("chat_notification", data);
};
