export const SHOW_EDIT_DIALOG = "SHOW_EDIT_DIALOG";
export const HIDE_EDIT_DIALOG = "HIDE_EDIT_DIALOG";

export const EDIT_PENDING = "EDIT_PENDING";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_ERROR = "EDIT_ERROR";

export const GET_ALL_GROUPS_SUCCESS = "GET_ALL_GROUPS_SUCCESS";
export const GET_ALL_GROUPS_ERROR = "GET_ALL_GROUPS_ERROR";
export const GET_ALL_GROUPS_PENDING = "GET_ALL_GROUPS_PENDING";

export const DELETE_GROUPS_SUCCESS = "DELETE_GROUPS_SUCCESS";
export const DELETE_GROUPS_ERROR = "DELETE_GROUPS_ERROR";
export const DELETE_GROUPS_PENDING = "DELETE_GROUPS_PENDING";

export function getShowEditDialogAction() {
  return {
    type: SHOW_EDIT_DIALOG,
  };
}

export function getHideEditDialogAction() {
  return {
    type: HIDE_EDIT_DIALOG,
  };
}

export function getEditUserPendingAction() {
  return {
    type: EDIT_PENDING,
  };
}

export function getAllGroupsSuccessAction(groups) {
  return {
    type: GET_ALL_GROUPS_SUCCESS,
    groups,
  };
}

export function getAllGroupsErrorAction(error) {
  return {
    type: GET_ALL_GROUPS_ERROR,
    error: error,
  };
}

export function getAllGroupsPendingAction() {
  return {
    type: GET_ALL_GROUPS_PENDING,
  };
}

export function getDeleteGroupSuccessAction(allGroups) {
  return {
    type: DELETE_GROUPS_SUCCESS,
    allGroups,
  };
}

export function getDeleteGroupErrorAction() {
  return {
    type: DELETE_GROUPS_ERROR,
  };
}

export function getEditSuccessAction(userInfo) {
  let placeHolderId = "010101";
  return {
    type: EDIT_SUCCESS,
    user: { id: placeHolderId, userName: userInfo.newUserName },
    oldUserName: userInfo.oldUserName,
    password: userInfo.newPassword,
  };
}

export function getEditErrorAction(error) {
  return {
    type: EDIT_ERROR,
    error: error,
  };
}

export function editUser(currentUserName, newUserName, newPassword) {
  let userInfo = {
    oldUserName: currentUserName,
    newUserName: newUserName,
    newPassword: newPassword,
  };

  console.log("Attempting Edit of User");
  return (dispatch) => {
    dispatch(getEditUserPendingAction());
    edit(userInfo)
      .then(
        (success) => {
          dispatch(getEditSuccessAction(userInfo));
        },
        (error) => {
          dispatch(getEditErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getEditErrorAction(error));
      });
  };
}

function edit(userInfo) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      oldGroupName: userInfo.oldUserName,
      newUserName: userInfo.newUserName,
      newPassword: userInfo.newPassword,
      email: "test@gmail.com",
    }),
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "user/",
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

export function getUserGroups(id) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group/groupsOf/" + id,
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get a proper response");
      return;
    }
  });
}

export function editGroup(oldGroupName, newGroupName) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      oldGroupName,
      newGroupName,
    }),
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group/",
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
export function getAllUsers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "user",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get all Users");
      return;
    }
  });
}

export function dispatchGetAllGroups() {
  console.log("Attempting to get all groups");
  return (dispatch) => {
    getAllGroups()
      .then(
        (groups) => {
          dispatch(getAllGroupsSuccessAction(groups));
        },
        (error) => {
          dispatch(getAllGroupsErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAllGroupsErrorAction(error));
      });
  };
}

export function dispatchDeleteGroup(groupName) {
  return (dispatch) => {
    deleteGroup(groupName).then(
      (success) => {
        dispatch(dispatchGetAllGroups());
      },
      (error) => {
        dispatch(getDeleteGroupErrorAction());
      }
    );
  };
}

export function getAllGroups() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get all Groups");
      return;
    }
  });
}

export function getUser() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "user",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not get User");
      return;
    }
  });
}

export function deleteGroup(groupName) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupName,
    }),
  };
  return fetch(
    process.env.REACT_APP_BACKEND_ROUTE + "group/",
    requestOptions
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.log("Could not delete Group");
      return;
    }
  });
}
