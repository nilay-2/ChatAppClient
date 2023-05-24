import { chatActions } from "../actions/chatActions";

const initState = {
  messages: [],
  chosenChatDetails: null,
  chatType: null,
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

    default:
      return state;
  }
};

export default reducer;
