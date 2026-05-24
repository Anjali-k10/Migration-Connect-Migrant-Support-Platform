import express from "express";
import checkVerifiedMigrant from "../middleware/verified.middleware.js";
import migrantAuth from "../middleware/migrantAuth.middleware.js";
import adminAuth from "../middleware/adminAuth.middleware.js";

import {   createEmergency,
  resolveEmergency,
  listEmergencies } from "../controllers/emergency.controller.js";

const router = express.Router();

router.post("/create", migrantAuth, checkVerifiedMigrant, createEmergency);
router.get("/",adminAuth, listEmergencies); 
router.put("/resolve/:id", adminAuth, resolveEmergency);
export default router;

