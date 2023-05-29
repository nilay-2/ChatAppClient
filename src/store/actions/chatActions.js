// import { toggleButtonClasses } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
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
    console.log(response);
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
    console.log(response);
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
