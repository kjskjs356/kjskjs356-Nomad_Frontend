import http from "http";
import WebSocket from "ws";
import express from "express";

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

// server.js의 socket : 연결된 브라우저
wss.on("connection", (socket) => {
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from Server"));
  socket.on("message", (message) => {
    // 깨짐 방지를 위해 utf8인코딩
    console.log(message.toString("utf8"));
  });
  socket.send("hello!!!");
});

server.listen(3000, handleListen);
