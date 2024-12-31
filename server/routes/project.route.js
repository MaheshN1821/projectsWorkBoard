import express from "express";
import {
  handleProjectInfo,
  handleUserProjectDetails,
} from "../controller/project.controller.js";
const router = express.Router();

router.get("/details", handleProjectInfo);

router.get("/details/:userId", handleUserProjectDetails);

export default router;
