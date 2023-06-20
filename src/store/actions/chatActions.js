// import { toggleButtonClasses } from "@mui/material";
import { toast } from "react-toastify";
import * as api from "../../api";
export const chatType = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

export const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: "CHAT.SET_CHOSEN_CHAT_DETAILS",
  SET_TYPE: "CHAT.SET_TYPE",
  SET_MESSAGES: "CHAT.SET_MESSAGES",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  SET_PARTICIPANTS: "SET_PARTICIPANTS",
  TOGGLE_TYPING_INDICATOR: "TOGGLE_TYPING_INDICATOR",
  APPEND_MESSAGE: "APPEND_MESSAGE",
  SET_REPLY_MESSAGE: "SET_REPLY_MESSAGE",
  SET_DELETE_MESSAGE: "SET_DELETE_MESSAGE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
  DECREMENT_COUNTER: "DECREMENT_COUNTER",
  UPDATE_MARK_AS_READ: "UPDATE_MARK_AS_READ",
  UPDATE_MARK_ALL_AS_READ: "UPDATE_MARK_ALL_AS_READ",
  SET_MESSAGE_NOTIFICATION: "SET_MESSAGE_NOTIFICATION",
  APPEND_MESSAGE_NOTIFICATION: "APPEND_MESSAGE_NOTIFICATION",
  READ_NOTIFICATION: "READ_NOTIFICATION",
  SET_GROUP_CHAT_MESSAGE_NOTIFICATION: "SET_GROUP_CHAT_MESSAGE_NOTIFICATION",
  APPEND_GROUP_NOTIFICATION: "APPEND_GROUP_NOTIFICATION",
};

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (chatDetails, chatType) =>
      dispatch(setChosenChatDetails(chatDetails, chatType)),
    setMessage: (messages) => dispatch(setMessages(messages)),
    getInitialChatHistory: (participants) =>
      dispatch(getInitialChatHistory(participants)),
    clearMessagesBeforeNextChat: (loadingStatus) =>
      dispatch(clearMessagesBeforeNextChat(loadingStatus)),
    getInitialGroupChatHistory: (groupId) =>
      dispatch(getInitialGroupChatHistory(groupId)),
    toggleTypingIndicator: (sender, state) =>
      dispatch(toggleTypingIndicator(sender, state)),
    setreplyToMessage: (message) => dispatch(setReplyToMessage(message)),
    setDeleteMessage: (message) => dispatch(setDeleteMessage(message)),
    deleteMessage: () => dispatch(deleteMessage()),
    sendDeleteRequest: (message) => dispatch(sendDeleteRequest(message)),
    sendGroupMsgDeleteRequest: (data) =>
      dispatch(sendGroupMsgDeleteRequest(data)),
    setInvtNotifications: (notifications) =>
      dispatch(setInvtNotifications(notifications)),
    decrementCounter: (value) => dispatch(decrementCounter(value)),
    markAsRead: (id, value) => dispatch(markAsRead(id, value)),
    updateMarkAsReadUi: (id) => dispatch(updateMarkAsReadUi(id)),
    markAllAsRead: (value) => dispatch(markAllAsRead(value)),
    updatemarkAllAsReadUi: () => dispatch(updatemarkAllAsReadUi()),
    readNotification: (notifications) =>
      dispatch(readNotification(notifications)),
  };
};

export const setChosenChatDetails = (chatDetails, chatType) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatType,
    chatDetails,
  };
};

export const toggleTypingIndicator = (sender, state) => {
  return {
    type: chatActions.TOGGLE_TYPING_INDICATOR,
    sender,
    state,
  };
};

export const setMessages = (messages) => {
  // console.log(messages);
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};

export const appendMessage = (message) => {
  return {
    type: chatActions.APPEND_MESSAGE,
    message,
  };
};

const getInitialChatHistory = (participants) => {
  return async (dispatch) => {
    const response = await api.getChatHistory(participants);
    dispatch(clearMessagesBeforeNextChat(null));
    dispatch(setMessages(response.data?.messages));
  };
};

const clearMessagesBeforeNextChat = (loadingStatus) => {
  return {
    type: chatActions.CLEAR_MESSAGES,
    loadingStatus,
  };
};

const getInitialGroupChatHistory = (groupId) => {
  return async (dispatch) => {
    const response = await api.getGroupChatHistory(groupId);
    dispatch(clearMessagesBeforeNextChat(null));
    dispatch(setMessages(response.data.data?.groupChatMessages));
  };
};

const setReplyToMessage = (message) => {
  return {
    type: chatActions.SET_REPLY_MESSAGE,
    message,
  };
};

const setDeleteMessage = (message) => {
  return {
    type: chatActions.SET_DELETE_MESSAGE,
    message,
  };
};

const deleteMessage = () => {
  return {
    type: chatActions.DELETE_MESSAGE,
  };
};

const sendDeleteRequest = (messageToBeDeleted) => {
  return async (dispatch) => {
    const response = await api.deleteMessage(messageToBeDeleted);
    // console.log(response);
    const { status, message } = response?.data;
    if (status === "success") {
      dispatch(deleteMessage());
      dispatch(setDeleteMessage(null));
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };
};

const sendGroupMsgDeleteRequest = (data) => {
  return async (dispatch) => {
    const response = await api.deleteGroupMessage(data);
    // console.log(response);
    const { status, message } = response?.data;
    if (status === "success") {
      dispatch(deleteMessage());
      dispatch(setDeleteMessage(null));
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };
};

const markAsRead = (id, value) => {
  return async (dispatch) => {
    const response = await api.markNotificationAsRead(id);
    // console.log(response);
    if (response.data?.status === "success") {
      dispatch(updateMarkAsReadUi(id));
      dispatch(decrementCounter(value));
    } else if (response?.error) {
      console.log(response.exception.response.data?.message);
    }
  };
};

const updateMarkAsReadUi = (id) => {
  return {
    type: chatActions.UPDATE_MARK_AS_READ,
    id,
  };
};

export const setInvtNotifications = (notifications) => {
  return {
    type: chatActions.SET_NOTIFICATIONS,
    notifications,
  };
};

const decrementCounter = (value) => {
  return {
    type: chatActions.DECREMENT_COUNTER,
    value,
  };
};

const markAllAsRead = (value) => {
  return async (dispatch) => {
    const response = await api.markAllNotificationsAsRead();
    // console.log(response);
    if (response.data.status === "success") {
      dispatch(updatemarkAllAsReadUi());
      dispatch(decrementCounter(value));
      toast.success(response.data?.message, {
        theme: "dark",
        position: "top-right",
        autoClose: 4000,
      });
    } else if (response.error) {
      console.log(response.exception.response.data?.message);
    }
  };
};

const updatemarkAllAsReadUi = () => {
  return {
    type: chatActions.UPDATE_MARK_ALL_AS_READ,
  };
};

const readNotification = (notifications) => {
  return {
    type: chatActions.READ_NOTIFICATION,
    notifications,
  };
};

export const setMessageNotification = (notification) => {
  return {
    type: chatActions.SET_MESSAGE_NOTIFICATION,
    notification,
  };
};

export const appendMessageNotification = (notification) => {
  return {
    type: chatActions.APPEND_MESSAGE_NOTIFICATION,
    notification,
  };
};
