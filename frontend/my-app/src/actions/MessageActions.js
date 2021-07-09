export const MESSAGES_SUCCESS = "MESSAGES_SUCCESS";
export const MESSAGES_ERROR = "MESSAGES_ERROR";
export const USER_INBOX_SUCCESS = "USER_INBOX_SUCCESS";
export const USER_INBOX_ERROR = "USER_INBOX_ERROR";
export const GROUP_INBOX_SUCCESS = "GROUP_INBOX_SUCCESS";
export const GROUP_INBOX_ERROR = "GROUP_INBOX_ERROR";

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

export function getUserInboxSuccess(messages) {
  return {
    type: USER_INBOX_SUCCESS,
    userInbox: messages,
  };
}

export function getGroupInboxSuccess(messages) {
  return {
    type: GROUP_INBOX_SUCCESS,
    groupInbox: messages,
    error: null,
  };
}

export function getUserInboxError(messages) {
  return {
    type: USER_INBOX_ERROR,
    userInbox: messages,
  };
}

export function getGroupInboxError(messages) {
  return {
    type: GROUP_INBOX_ERROR,
    groupInbox: messages,
  };
}

export function getUserMessages(userName) {
  console.log("Attempting to get all User Messages");

  return (dispatch) => {
    userInbox(userName)
      .then(
        (messages) => {
          dispatch(getUserInboxSuccess(messages));
        },
        (error) => {
          dispatch(getUserInboxError(error));
        }
      )
      .catch((error) => {
        dispatch(getGroupInboxError(error));
      });
  };
}

function userInbox(userName) {
  const requestOptions = {
    method: "GET",
    //header: { Authorization: "Bearer " + userName },
  };

  return fetch(
    "http://localhost:8080/message/inbox/" + userName,
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

export function getGroupMessages(userName) {
  console.log("Attempting to get this users groups messages");
  return (dispatch) => {
    groupMessages(userName).then(
      (groupMessages) => {
        dispatch(getGroupInboxSuccess(groupMessages));
      },
      (error) => {
        dispatch(getGroupInboxError(error));
      }
    );
  };
}

//Gets Group messages that the User is subscribed to
function groupMessages(userName) {
  const requestOptions = {
    method: "GET",
    //header: { Authorization: "Bearer " + userName },
  };
  return fetch(
    "http://localhost:8080/message/groupInbox/" + userName,
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

export function sendUserMessage(receiver, sender, subject, content) {
  let messageInfo = {
    receiver: receiver,
    sender: sender,
    subject: subject,
    content: content,
  };

  console.log("Attempting to send message to User:" + messageInfo.receiver);
  return (dispatch) => {
    userMessage(messageInfo)
      .then(
        (success) => {
          dispatch(getMessagesSuccessAction());
        },
        (error) => {
          dispatch(getMessagesErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getMessagesErrorAction(error));
      });
  };
}

export function sendGroupMessage(receiver, sender, subject, content) {
  let messageInfo = {
    receiver: receiver,
    sender: sender,
    subject: subject,
    content: content,
  };

  console.log("Attempting to send message to User:" + messageInfo.receiver);
  return (dispatch) => {
    groupMessage(messageInfo)
      .then(
        (success) => {
          dispatch(getMessagesSuccessAction());
        },
        (error) => {
          dispatch(getMessagesErrorAction(error));
        }
      )
      .catch((error) => {
        dispatch(getMessagesErrorAction(error));
      });
  };
}

function userMessage(messageInfo) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      receiverName: messageInfo.receiver,
      senderName: messageInfo.sender,
      subject: messageInfo.subject,
      messageContent: messageInfo.content,
    }),
  };
  return fetch("http://localhost:8080/message/send", requestOptions).then(
    (response) => {
      if (response.ok) {
        response.json();
      } else {
        console.log("Could not send message");
        return;
      }
    }
  );
}

function groupMessage(messageInfo) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      receiverName: messageInfo.receiver,
      senderName: messageInfo.sender,
      subject: messageInfo.subject,
      messageContent: messageInfo.content,
    }),
  };
  return fetch("http://localhost:8080/message/send", requestOptions).then(
    (response) => {
      if (response.ok) {
        response.json();
      } else {
        console.log("Could not send message");
        return;
      }
    }
  );
}

// export function getAllMessages() {
//   console.log("Getting all messages");
//   return (dispatch) => {
//     dispatch
//   }
// }

// async function handleResponse(response) {
//   let messages = [];
//   let responseBody = await response.json(); //returns an Array
//   console.log(responseBody);

//   responseBody.forEach((element) => {
//     let from = element.split(":")[1].split(":")[0].trim(); //gets senderID
//     let content = element.split(":")[1].split(":")[1].trim(); //gets Message content
//     let message = {
//       sender: from,
//       messageContent: content,
//     };
//     messages.push(message);
//   });

//   return messages;
// }
