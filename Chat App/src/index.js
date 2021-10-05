// Enviroment Config
import dotenv from "dotenv";
dotenv.config();

// Modules
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Filter from "bad-words";

// my Functions
import { generateMessage, generateLocationMessage } from "./utils/messages.mjs";
import {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} from "./utils/users.mjs";

// ES6 Methods
import { fileURLToPath } from "url";
import path, { dirname } from "path";

// ES6 manpulate
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//  Define paths for Express config
const publicDirectorPath = path.join(__dirname, "../public");

//  Setup static directory to serve
app.use(express.static(publicDirectorPath));

app.get("/", (req, res) => res.render("index"));

let count = 0;

// server (emit) -> client (receive) - countUpdated
// client (emit) -> server (receive) - increment

io.on("connection", (socket) => {
  console.log("New WebSocket Connection");

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", generateMessage(user.username, " Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(user.username, ` has joined!`));

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();

    // soket.emit, io.emit, soket.brodcast.emit
    // io.to.emit, soket.brodcast.to.emit
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed!");
    }
    console.log(message);
    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("sendLocation", (location, callback) => {
    const user = getUser(socket.id);
    console.log(location);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${location.lat},${location.long}`
      )
    );
    callback();
    // io.emit(
    //   "message",
    //   `https://google.com/maps?q=${location.lat},${location.long}`
    // );
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(user.username, `has left!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  // socket.emit("countUpdated", count);

  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count);
  //   io.emit("countUpdated", count);
  // });
});

server.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
