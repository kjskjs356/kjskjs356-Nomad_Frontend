import http from "http";
import WebSocket from "ws";
import express from "express";
import { parse } from "path";
import { consumers } from "stream";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// public 폴더를 유저에게 공개
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("Listening on http://localhost:3000");
// app 포트번호 3000
// app.listen(3000, handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from Server");
}

const sockets = [];

// server.js의 socket : 연결된 브라우저
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Browser");
  socket.on("close", onSocketClose);
  // 메시지를 받았을 때 발생
  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString());
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${message.payload}`)
        );
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});

server.listen(3000, handleListen);
