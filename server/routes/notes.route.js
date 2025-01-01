import express from "express";
import {
  handleGetNote,
  handleSaveNote,
} from "../controller/notes.controller.js";
const router = express.Router();

router.post("/get-notes", handleGetNote);

router.post("/save-note", handleSaveNote);

export default router;
