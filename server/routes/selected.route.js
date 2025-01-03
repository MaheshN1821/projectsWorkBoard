import express from "express";
import {
  handleGetSelected,
  handleSaveSelected,
  handleSingleStudentSelected,
} from "../controller/selected.controller.js";

const router = express.Router();

router.get("/get/freelancer/:freeId", handleGetSelected);

router.get("/get/user/:userId", handleSingleStudentSelected);

router.post("/save", handleSaveSelected);

export default router;
