import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
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
import handleFreelancerChat from "./routes/freelancerChat.route.js";
import handleUserChat from "./routes/userChat.routes.js";

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
app.use("/chat/user", handleUserChat);
app.use("/chat/freelancer", handleFreelancerChat);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.log(err);
  });
