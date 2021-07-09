import * as userActions from "../actions/UserActions";

const initialState = {
  oldUserName: "",
  newUserName: "",
  newPassword: "",
  showEditDialog: false,
  error: null,
};

export function userReducer(state = initialState, action) {
  console.log("I am in Reducer: " + action.type);

  switch (action.type) {
    case userActions.SHOW_EDIT_DIALOG:
      return {
        ...state,
        showLoginDialog: true,
        error: null,
      };
    case userActions.HIDE_EDIT_DIALOG:
      return {
        ...state,
        showLoginDialog: false,
        error: null,
      };
    case userActions.EDIT_PENDING:
      return {
        ...state,
        error: null,
      };

    case userActions.EDIT_SUCCESS:
      return {
        ...state,
        oldUserName: action.user.oldUserName,
        newUserName: action.user.newUserName,
        newPassword: action.user.newPassword,
      };
    default:
      return state;
  }
}

export default userReducer;
