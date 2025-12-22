import express from "express";
import {   createEmergency,
  resolveEmergency,
  listEmergencies } from "../controllers/emergency.controller.js";

const router = express.Router();

router.post("/create", createEmergency);
router.get("/", listEmergencies); 
router.put("/resolve/:id", resolveEmergency);
export default router;

