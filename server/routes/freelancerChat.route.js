import express from "express";
import {
  handleFreelancerChatRetreiving,
  handleFreelancerChatSaving,
} from "../controller/freelancerChat.controller.js";
const router = express();

router.post("/send-messages", handleFreelancerChatSaving);

router.post("/get-messages", handleFreelancerChatRetreiving);

export default router;
