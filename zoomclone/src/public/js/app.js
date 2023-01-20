const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
// app.js의 socket : 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`);

// 함수 형태로 변환
function handleOpen() {
  console.log("Connected to Server");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
