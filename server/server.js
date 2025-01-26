import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpProxy from "http-proxy";
import handleUserAuth from "./routes/user.auth.route.js";
import handlefreelancerAuth from "./routes/freelancer.auth.route.js";
import handleRefreshToken from "./routes/refreshToken.route.js";
import handleStudent from "./routes/student.route.js";
import handleProject from "./routes/project.route.js";
import handleSelected from "./routes/selected.route.js";
import handlePayment from "./routes/payment.route.js";
import handleFreelancerInformation from "./routes/freelancer.route.js";
import handleNotes from "./routes/notes.route.js";
import handleRequest from "./routes/request.route.js";
import handleNotification from "./routes/notify.route.js";

// import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

const corsOptions = {
  method: ["GET", "POST"],
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  origin: "https://projectsworkboard.vercel.app",
  maxAge: 86400,
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth/student", handleUserAuth);
app.use("/auth/freelancer", handlefreelancerAuth);
app.use("/refreshToken", handleRefreshToken);
app.use("/student", handleStudent);
app.use("/project", handleProject);
app.use("/notes", handleNotes);
app.use("/selected", handleSelected);
app.use("/payment", handlePayment);
app.use("/freelancer", handleFreelancerInformation);
app.use("/request", handleRequest);
app.use("/notify", handleNotification);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3300;

const proxy = httpProxy.createProxyServer({
  target: `https://projects-work-board.vercel.app`,
  ws: true,
});

const server = app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

const io = new Server(server, {
  cors: {
    origin: "https://projectsworkboard.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

let users = [];

const addUsers = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);

  socket.on("addUser", (userId) => {
    addUsers(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", { senderId, text });
    } else {
      console.log("Receiver not found:", receiverId);
    }
    // io.to(user.socketId).emit("getMessage", {
    //   senderId,
    //   text,
    // });
  });

  socket.on("disconnect", () => {
    console.log("user Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.log(err);
  });
