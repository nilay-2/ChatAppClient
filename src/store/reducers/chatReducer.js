import { CallToActionSharp, FastRewindOutlined } from "@mui/icons-material";
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
  notificationCount: null,
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
      const unreadNotifications = action.notifications.filter(
        (notification) => {
          let notificatn;
          if (notification.read === false) notificatn = notification;
          return notificatn;
        }
      );
      return {
        ...state,
        invtNotifications: action.notifications,
        notificationCount: unreadNotifications.length,
      };
    case chatActions.DECREMENT_COUNTER:
      return {
        ...state,
        notificationCount: action.value,
      };
    case chatActions.UPDATE_MARK_AS_READ:
      const invtNotifications = state.invtNotifications.map((notification) => {
        if (notification._id === action.id)
          return { ...notification, read: true };
        else return notification;
      });
      return {
        ...state,
        invtNotifications: invtNotifications,
      };
    case chatActions.UPDATE_MARK_ALL_AS_READ:
      const readNotifications = state.invtNotifications.map((notification) => {
        return { ...notification, read: true };
      });
      return {
        ...state,
        invtNotifications: readNotifications,
      };
    default:
      return state;
  }
};

export default reducer;
