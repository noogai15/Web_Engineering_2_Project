export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";

export const AUTHENTICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

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

export function authenticateUser(userID, password) {
  console.log("Authenticate");

  return (dispatch) => {
    dispatch(getAuthenticateUserPendingAction());
    login(userID, password)
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

export function login(userID, password) {
  let cred = btoa(`${userID}:${password}`);
  const requestOptions = {
    method: "POST",
    //headers: { "Content-Type": "application/json" },
    //body: JSON.stringify({ userID, password }),
    headers: { Authorization: "Basic " + cred },
  };
  return fetch("http://localhost:8080/authenticate/login", requestOptions)
    .then(handleResponse)
    .then((userSession) => {
      return userSession;
    });
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

export function logout() {
  console.error("Should logout user");
}
