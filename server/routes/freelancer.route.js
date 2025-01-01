import express from "express";
import {
  handleGetFreelancerInfo,
  handleFreelancerInfoUpdation,
  handleFreelancerName,
  handleProjectDeletion,
} from "../controller/freelancer.controller.js";

const router = express.Router();

router.get("/:freeId", handleGetFreelancerInfo);

router.post("/update-details", handleFreelancerInfoUpdation);

router.get("/get-name/:fId", handleFreelancerName);

router.post("/delete-project", handleProjectDeletion);

export default router;
