import { chatActions } from "../actions/chatActions";

const initState = {
  messages: [],
  chosenChatDetails: null,
  chatType: null,
  typingIndicator: {
    sender: "",
    toggleState: null,
  },
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
        messages: [],
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
    default:
      return state;
  }
};

export default reducer;
