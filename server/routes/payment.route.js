import express from "express";
import {
  handleStudentPayment,
  handleStatus,
} from "../controller/payment.controller.js";

const router = express.Router();

router.post("/order", handleStudentPayment);

router.post("/status", handleStatus);

export default router;
