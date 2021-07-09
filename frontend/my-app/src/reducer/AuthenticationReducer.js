import * as authenticationActions from "../actions/AuthenticationActions";
import * as userActions from "../actions/UserActions";

const initialState = {
  user: {
    id: "",
    userName: "",
    isAdministrator: false,
  },
  users: [],

  loginPending: false,
  showLoginDialog: false,
  loggedInUser: "",
  loggedIn: false,
  error: null,
  accessToken: "",
};

export function authenticationReducer(state = initialState, action) {
  console.log("I am in Reducer: " + action.type);

  switch (action.type) {
    case authenticationActions.SHOW_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null,
      };
    case authenticationActions.HIDE_LOGIN_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null,
      };
    case authenticationActions.AUTHENTICATION_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };

    case authenticationActions.AUTHENTICATION_SUCCESS: {
      return {
        ...state,
        showLoginDialog: false,
        pending: false,
        user: action.user,
        accessToken: action.accessToken,
        loggedIn: true,
      };
    }
    case authenticationActions.AUTHENTICATION_ERROR: {
      return {
        ...state,
        pending: false,
        error: "Authentication failed",
      };
    }
    case authenticationActions.LOGOUT_ACTION: {
      return {
        ...state,
        loggedIn: false,
      };
    }

    case userActions.EDIT_SUCCESS: {
      return {
        ...state,
        user: action.user,
      };
    }
    case authenticationActions.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.allUsers,
      };

    case authenticationActions.GET_ALL_USERS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export default authenticationReducer;
