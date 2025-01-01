import express from "express";
import {
  handleProjectDetails,
  handleProjectDetailsDeletion,
  handleProjectDetailsUpdation,
  handleStudentName,
} from "../controller/student.controller.js";
const router = express.Router();

router.post("/project-details", handleProjectDetails);

router.post("/project-details-update", handleProjectDetailsUpdation);

router.post("/project-details-deletion", handleProjectDetailsDeletion);

router.get("/get-name/:sId", handleStudentName);

export default router;
