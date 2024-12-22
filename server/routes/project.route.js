import express from "express";
import handleProjectInfo from "../controller/project.controller.js";
const router = express.Router();

router.get("/details", handleProjectInfo);

export default router;
