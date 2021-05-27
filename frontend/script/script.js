const socket = io("http://localhost:3000");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const userService = require("../../endpoints/user/UserService");

//Handles the "chat-message" emission in inde.html
socket.on("chat-message", (data) => {
  appendMessage(data);
});

//Send message
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message); //Emission to be handled
  socket.on("send-chat-message", (message) => {
    //Handling of emission
    console.log(message);
  });
  messageInput.value = ""; //Reset content of message box
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

