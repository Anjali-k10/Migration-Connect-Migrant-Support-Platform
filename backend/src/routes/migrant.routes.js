import express from "express";
console.log("MIGRANT ROUTES LOADED");

import {
  registerMigrant,
  getMigrantById,
  updateMigrant,
  deleteMigrant,
  verifyMigrant,
  listMigrants
} from "../controllers/migrant.controller.js";

import adminAuth from "../middleware/adminAuth.middleware.js";

const router = express.Router();

// Admin only
router.get("/", adminAuth, listMigrants);
router.put("/verify/:migrantId", adminAuth, verifyMigrant);

// Migrant actions
router.post("/register", registerMigrant);
router.get("/:migrantId", getMigrantById);
router.put("/:migrantId", updateMigrant);
router.delete("/:migrantId", deleteMigrant);

export default router;


