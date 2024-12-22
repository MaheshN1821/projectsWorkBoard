import express from "express";
import {
  handleGetSelected,
  handleSaveSelected,
} from "../controller/selected.controller.js";

const router = express.Router();

router.get("/get", handleGetSelected);

router.post("/save", handleSaveSelected);

export default router;
