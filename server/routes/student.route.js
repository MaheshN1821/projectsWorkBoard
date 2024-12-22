import express from "express";
import {
  handleProjectDetails,
  handleProjectDetailsUpdation,
} from "../controller/student.controller.js";
const router = express.Router();

router.post("/project-details", handleProjectDetails);

router.post("/project-details-update", handleProjectDetailsUpdation);

export default router;
