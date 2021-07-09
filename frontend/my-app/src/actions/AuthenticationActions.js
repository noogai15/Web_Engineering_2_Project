export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export const LOGOUT_ACTION = "LOGOUT_ACTION";

export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_ERROR = "GET_ALL_USERS_ERROR";

//TODO: Maybe use state here instead?
export var user = "";
export var token = "";

export function getShowLoginDialogAction() {
  return {
    type: SHOW_LOGIN_DIALOG,
  };
}

export function getHideLoginDialogAction() {
  return {
    type: HIDE_LOGIN_DIALOG,
  };
}

export function getAuthenticateUserPendingAction() {
  return {
    type: AUTHENTICATION_PENDING,
  };
}

export function getAuthenticationSuccessAction(userSession) {
  return {
    type: AUTHENTICATION_SUCCESS,
    user: userSession.user,
    accessToken: userSession.accessToken,
  };
}

export function getAuthenticationErrorAction(error) {
  return {
    type: AUTHENTICATION_ERROR,
    error: error,
  };
}

export function getLogoutAction() {
  return {
    type: LOGOUT_ACTION,
  };
}

export function getAllUsersSuccess(users) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    allUsers: users,
  };
}

export function getAllUsersError(error) {
  return {
    type: GET_ALL_USERS_ERROR,
    error: error,
  };
}

export function authenticateUser(userName, password) {
  console.log("Authenticate");

  return (dispatch) => {
    dispatch(getAuthenticateUserPendingAction());
    login(userName, password)
      .then(
        (userSession) => {
          dispatch(getAuthenticationSuccessAction(userSession));
        },
        (error) => {
          dispatch(getAuthenticationErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getAuthenticationErrorAction(error));
      });
  };
}

export function logout() {
  return (dispatch) => {
    console.log("Dispatching Logout");
    dispatch(getLogoutAction());
  };
}

export function login(userName, password) {
  let cred = btoa(`${userName}:${password}`);
  user = userName;
  const requestOptions = {
    method: "POST",

    headers: { Authorization: "Basic " + cred },
  };
  return fetch("http://localhost:8080/authenticate/login", requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
}

export function getAllUsers() {
  console.log("Attempting to get all users");
  return (dispatch) => {
    allUsers()
      .then(
        (users) => {
          dispatch(getAllUsersSuccess(users));
        },
        (error) => {
          dispatch(getAllUsersError(error));
        }
      )
      .catch((error) => {
        dispatch(getAllUsersError(error));
      });
  };
}

function allUsers() {
  const requestOptions = {
    method: "GET",
    //headers: { Authorization: "Basic " + cred },
  };
  return fetch("http://localhost:8080/user", requestOptions).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Could not get proper response");
        return;
      }
    }
  );
}

function handleResponse(response) {
  const authorizationHeader = response.headers.get("authorization");

  return response.text().then((text) => {
    console.log("Receive result: " + authorizationHeader);

    const data = text && JSON.parse(text);
    var token;
    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];

      if (!response.ok) {
        if (response.status === 401) {
          //auto logout if response returned from api
          logout();
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      } else {
        let userSession = {
          user: data,
          accessToken: token,
        };
        return userSession;
      }
    }
  });
}
