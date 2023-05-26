import { toggleButtonClasses } from "@mui/material";
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
};

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (chatDetails, chatType) =>
      dispatch(setChosenChatDetails(chatDetails, chatType)),
    setMessage: (messages) => dispatch(setMessages(messages)),
    getInitialChatHistory: (participants) =>
      dispatch(getInitialChatHistory(participants)),
    clearMessagesBeforeNextChat: () => dispatch(clearMessagesBeforeNextChat()),
    getInitialGroupChatHistory: (groupId) =>
      dispatch(getInitialGroupChatHistory(groupId)),
    toggleTypingIndicator: (sender, state) =>
      dispatch(toggleTypingIndicator(sender, state)),
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
    dispatch(setMessages(response.data.messages));
  };
};

const clearMessagesBeforeNextChat = () => {
  return {
    type: chatActions.CLEAR_MESSAGES,
  };
};

const getInitialGroupChatHistory = (groupId) => {
  return async (dispatch) => {
    const response = await api.getGroupChatHistory(groupId);
    // console.log(response);
    dispatch(setMessages(response.data.data?.groupChatMessages));
  };
};
