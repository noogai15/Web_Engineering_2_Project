import * as registerActions from "../actions/RegisterActions";
import * as userActions from "../actions/UserActions";

const initialState = {
  allGroups: [],
  pending: false,
  error: null,
};

export function groupsReducer(state = initialState, action) {
  console.log("I am in Reducer: " + action.type);

  switch (action.type) {
    case registerActions.CREATE_GROUP_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case registerActions.CREATE_GROUP_SUCCESS:
      state.allGroups.push(action.newGroup);
      return {
        ...state,
        pending: false,
        error: null,
      };
    case userActions.GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        pending: false,
        allGroups: action.groups,
        error: null,
      };
    case userActions.GET_ALL_GROUPS_PENDING:
      return {
        ...state,
        pending: true,
        error: null,
      };
    case userActions.GET_ALL_GROUPS_ERROR:
      return {
        state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
}

export default groupsReducer;
