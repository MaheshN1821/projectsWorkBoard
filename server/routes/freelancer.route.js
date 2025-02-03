import express from "express";
import {
  handleGetFreelancerInfo,
  handleFreelancerInfoUpdation,
  handleFreelancerName,
  handleProjectDeletion,
  handleProgressUpdation,
  handleSaveCompletion,
  handleGetCompleted,
  handleGetAllFreelancerInfo,
} from "../controller/freelancer.controller.js";

const router = express.Router();

router.get("/:freeId", handleGetFreelancerInfo);

router.get("/u/general-info", handleGetAllFreelancerInfo);

router.post("/update-details", handleFreelancerInfoUpdation);

router.get("/get-name/:fId", handleFreelancerName);

router.post("/delete-project", handleProjectDeletion);

router.post("/progress-updation", handleProgressUpdation);

router.post("/save-completed", handleSaveCompletion);

router.get("/get-completed/:freeId", handleGetCompleted);

export default router;
