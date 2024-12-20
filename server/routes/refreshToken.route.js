import express from "express";
import {
  refreshTokenHandler,
  refreshTokenFreelancerHandler,
} from "../controller/refershToken.controller.js";

const router = express.Router();

router.get("/user", refreshTokenHandler);

router.get("/freelancer", refreshTokenFreelancerHandler);

export default router;
