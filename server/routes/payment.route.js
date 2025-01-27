import express from "express";
import {
  handleStudentPayment,
  handleStatus,
} from "../controller/payment.controller.js";
import cors from "cors";

const specificCors = cors({
  origin: "https://projectsworkboard.vercel.app",
  methods: ["POST", "GET"],
  allowedHeaders: ["Content-Type", "X-VERIFY", "accept"],
});

const router = express.Router();

router.post("/order", specificCors, handleStudentPayment);

router.post("/status", specificCors, handleStatus);

export default router;
