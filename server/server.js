import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import handleUserAuth from "./routes/user.auth.route.js";
import handlefreelancerAuth from "./routes/freelancer.auth.route.js";
import handleRefreshToken from "./routes/refreshToken.route.js";
import handleStudent from "./routes/student.route.js";

dotenv.config();
const app = express();

const corsOptions = {
  method: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  origin: "http://localhost:5173",
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth/student", handleUserAuth);
app.use("/auth/freelancer", handlefreelancerAuth);
app.use("/refreshToken", handleRefreshToken);
app.use("/student", handleStudent);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3300;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
