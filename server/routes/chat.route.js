import express from "express";
import {
  handleGetChat,
  handleSaveChat,
} from "../controller/chat.controller.js";
const router = express.Router();

router.post("/getMessages", handleGetChat);

router.post("/", handleSaveChat);

export default router;
