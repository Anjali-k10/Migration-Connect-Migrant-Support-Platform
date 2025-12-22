import express from "express";
import checkVerifiedMigrant from "../middleware/verified.middleware.js";

import {   createEmergency,
  resolveEmergency,
  listEmergencies } from "../controllers/emergency.controller.js";

const router = express.Router();

router.post("/create",checkVerifiedMigrant, createEmergency);
router.get("/", listEmergencies); 
router.put("/resolve/:id", resolveEmergency);
export default router;

