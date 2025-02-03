import express from "express";
import {
  handleUserChatRetreiving,
  handleUserChatSaving,
} from "../controller/userChat.controller.js";
const router = express();

router.post("/send-messages", handleUserChatSaving);

router.post("/get-messages", handleUserChatRetreiving);

export default router;
