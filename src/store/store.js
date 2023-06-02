import {
  configureStore,
  combineReducers,
  applyMiddleware,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import friendsReducer from "./reducers/friendsReducer";
import chatReducer from "./reducers/chatReducer";
import groupChatReducer from "./reducers/groupChatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  friends: friendsReducer,
  chat: chatReducer,
  groupChat: groupChatReducer,
});

const store = configureStore(
  {
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
