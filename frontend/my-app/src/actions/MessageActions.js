export const MESSAGES_SUCCESS = "MESSAGES_SUCCESS";
export const MESSAGES_ERROR = "MESSAGES_ERROR";

export function getMessagesSuccessAction() {
  return {
    type: MESSAGES_SUCCESS,
  };
}

export function getMessagesErrorAction(error) {
  return {
    type: MESSAGES_ERROR,
    error: error,
  };
}

export function getUserMessages() {
  const requestOptions = {
    method: "GET",
  };
}
