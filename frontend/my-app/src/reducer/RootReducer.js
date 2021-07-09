import { combineReducers } from "redux";
import authenticationReducer from "./AuthenticationReducer";
import userReducer from "./UserReducer";
import messagesReducer from "./MessagesReducer";

import groupsReducer from "./GroupsReducer";

const rootReducer = combineReducers({
  userReducer,
  groupsReducer,
  messagesReducer,
  authenticationReducer,
});

export default rootReducer;
