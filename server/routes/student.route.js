import express from "express";
import handleProjectDetails from "../controller/student.controller.js";
const router = express.Router();

router.post("/project-details", handleProjectDetails);

export default router;
