export const SHOW_EDIT_DIALOG = "SHOW_EDIT_DIALOG";
export const HIDE_EDIT_DIALOG = "HIDE_EDIT_DIALOG";

export const EDIT_PENDING = "EDIT_PENDING";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_ERROR = "EDIT_ERROR";

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
      userName: userInfo.oldUserName,
      newUserName: userInfo.newUserName,
      newPassword: userInfo.newPassword,
      email: "test@gmail.com",
    }),
  };
  return fetch("http://localhost:8080/user/", requestOptions).then(
    (response) => {
      if (response.ok) {
        response.json();
      } else {
        console.log("Could not get proper response");
        return;
      }
    }
  );
}

export function deleteUser(userName, token) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
    }),
  };
  return fetch("http://localhost:8080/user/", requestOptions).then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("Could not delete User");
        return;
      }
    }
  );
}

export function deleteGroup(groupName) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupName: groupName,
    }),
  };
  return fetch("http://localhost:8080/group/", requestOptions).then(
    (response) => {
      if (response.ok) {
        return response;
      } else {
        console.log("Could not delete User");
        return;
      }
    }
  );
}
