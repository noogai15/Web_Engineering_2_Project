import * as messageActions from "../actions/MessageActions";

const initialState = {
  userMessages: [],
  groupMessages: [],
  error: null,
};

export function messagesReducer(state = initialState, action) {
  console.log("I am in Reducer: " + action.type);

  switch (action.type) {
    case messageActions.USER_INBOX_SUCCESS:
      return {
        ...state,
        userMessages: action.userInbox,
        error: null,
      };
    case messageActions.USER_INBOX_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case messageActions.GROUP_INBOX_SUCCESS:
      return {
        ...state,
        groupMessages: action.groupInbox,
        error: null,
      };
    case messageActions.DELETE_MESSAGE_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export default messagesReducer;
