const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

io.on("connection", (socket) => {
  console.log("new user connected");

  socket.on("join room", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined ${room}`);
    socket.to(room).emit('chat message', { user: '[INFO]', text: `${username} has joined the room` });
    socket.emit('room joined', { message: `You joined ${room}` });
  });

  socket.on("chat message", ({ text, user, room }) => {
    io.to(room).emit("chat message", { user: user, text: text });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
