import express from "express";
import {
  handleSavingRequest,
  handleGetRequest,
} from "../controller/request.controller.js";

const router = express.Router();

router.post("/save-request", handleSavingRequest);

router.post("/get-request", handleGetRequest);

export default router;
