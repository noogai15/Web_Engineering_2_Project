export const SHOW_REGISTER_DIALOG = "SHOW_REGISTER_DIALOG";
export const HIDE_SHOW_REGISTER_DIALOG = "HIDE_SHOW_REGISTER_DIALOG";

export const REGISTER_PENDING = "REGISTER_PENDING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const CREATE_GROUP_PENDING = "CREATE_GROUP_PENDING";
export const CREATE_GROUP_SUCCESS = "CREATE_GROUP_SUCCESS";
export const CREATE_GROUP_ERROR = "CREATE_GROUP_ERROR";

export function getShowRegisterDialogAction() {
  return {
    type: SHOW_REGISTER_DIALOG,
  };
}

export function getHideRegisterDialogAction() {
  return {
    type: HIDE_SHOW_REGISTER_DIALOG,
  };
}

export function getRegisterUserPendingAction() {
  return {
    type: REGISTER_PENDING,
  };
}

export function getRegisterSuccessAction() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function getRegisterErrorAction(error) {
  return {
    type: REGISTER_ERROR,
    error: error,
  };
}

export function getGroupCreateGroupPendingAction() {
  return {
    type: CREATE_GROUP_PENDING,
  };
}

export function getGroupCreateGroupSuccessAction(group) {
  return {
    type: CREATE_GROUP_SUCCESS,
    newGroup: group,
  };
}

export function getGroupCreateGroupError(error) {
  return {
    type: CREATE_GROUP_ERROR,
    error: error,
  };
}

export function registerUser(newUsername, newPassword) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: newUsername,
      password: newPassword,
      email: "test@gmail.com",
    }),
  };

  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "user/register",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      response.json();
    } else {
      console.log("Could not get proper response");
      return;
    }
  });
}

export function getRegisterGroup(groupName, members, token) {
  console.log("Attempting to create Group");
  return (dispatch) => {
    dispatch(getGroupCreateGroupPendingAction());

    registerGroup(groupName, members, token)
      .then(
        (group) => {
          dispatch(getGroupCreateGroupSuccessAction(group));
        },
        (error) => {
          dispatch(getGroupCreateGroupError(error));
        }
      )
      .catch((error) => {
        dispatch(getGroupCreateGroupError(error));
      });
  };
}

function registerGroup(groupName, members, token) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupName: groupName,
      members: members,
    }),
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group/createGroup",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get proper response");
      return;
    }
  });
}

function subscribeUserToGroup(members, groupName) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      members: members,
      groupName: groupName,
    }),
  };

  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group/subscribeUser",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get proper response");
      return;
    }
  });
}
