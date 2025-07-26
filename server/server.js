import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import handleUserAuth from "./routes/user.auth.route.js";
import pwbauthRoutes from "./routes/pwbauth.js";
import pwbprojectRoutes from "./routes/pwbprojects.js";
import pwbuserRoutes from "./routes/pwbuser.js";
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
import handleUserChat from "./routes/userChat.route.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import applicationRoutes from "./routes/application.js";
import notificationRoutes from "./routes/notifications.js";
import projectManagementRoutes from "./routes/projectManagement.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(helmet());
// app.use(
//   cors({
//     origin:
//       "https://projectsworkboard.vercel.app" ||
//       "https://www.projectsworkboard.vercel.app",
//     credentials: true,
//   })
// );

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

app.use(morgan("combined"));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const corsOptions = {
  methods: ["GET", "POST"],
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  origin: [
    "https://projectsworkboard.vercel.app",
    "https://www.projectsworkboard.vercel.app",
  ],
  maxAge: 86400,
};

app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(cookieParser());
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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/project-management", projectManagementRoutes);

app.use("/api/stripe", handlePayment);
app.use("/api/pwb/auth", pwbauthRoutes);
app.use("/api/pwb/projects", pwbprojectRoutes);
app.use("/api/pwb/users", pwbuserRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

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
