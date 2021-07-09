import * as registerActions from "../actions/RegisterActions";

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
    default:
      return state;
  }
}

export default groupsReducer;
