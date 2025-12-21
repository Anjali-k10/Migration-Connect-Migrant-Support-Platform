import express from "express";
import {  createEmergency,
  resolveEmergency } from "../controllers/emergency.controller.js";

const router = express.Router();

router.post("/create", createEmergency);
router.put("/resolve/:id", resolveEmergency);
export default router;

