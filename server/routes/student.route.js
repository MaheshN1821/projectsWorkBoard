import express from "express";
import {
  handleAccept,
  handleDecline,
  handleProjectDetails,
  handleProjectDetailsDeletion,
  handleProjectDetailsUpdation,
  handleSingleStudentInfo,
  handleStudentName,
} from "../controller/student.controller.js";
const router = express.Router();

router.post("/project-details", handleProjectDetails);

router.post("/project-details-update", handleProjectDetailsUpdation);

router.post("/project-details-deletion", handleProjectDetailsDeletion);

router.get("/get-name/:sId", handleStudentName);

router.get("/single/:studId", handleSingleStudentInfo);

router.post("/decline", handleDecline);

router.post("/accept", handleAccept);

export default router;
