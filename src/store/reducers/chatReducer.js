import { FastRewindOutlined } from "@mui/icons-material";
import { chatActions } from "../actions/chatActions";

const initState = {
  messages: [],
  chosenChatDetails: null,
  chatType: null,
  isLoading: null,
  typingIndicator: {
    sender: "",
    toggleState: null,
  },
  replyToMessage: null,
  messageToDelete: null,
  invtNotifications: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chatType: action.chatType,
        chosenChatDetails: action.chatDetails,
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case chatActions.CLEAR_MESSAGES:
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    case chatActions.TOGGLE_TYPING_INDICATOR:
      return {
        ...state,
        typingIndicator: {
          ...state.typingIndicator,
          sender: action.sender,
          toggleState: action.state,
        },
      };
    case chatActions.APPEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case chatActions.SET_REPLY_MESSAGE:
      return {
        ...state,
        replyToMessage: action.message,
      };
    case chatActions.SET_DELETE_MESSAGE:
      return {
        ...state,
        messageToDelete: action.message,
      };
    case chatActions.DELETE_MESSAGE:
      const filteredMessages = state.messages.filter((msg) => {
        let message;
        if (msg?._id !== state.messageToDelete?.id) {
          message = msg;
        }
        return message;
      });
      return {
        ...state,
        messages: [...filteredMessages],
      };
    case chatActions.SET_NOTIFICATIONS:
      return {
        ...state,
        invtNotifications: action.notifications,
      };
    default:
      return state;
  }
};

export default reducer;
