import express from "express";

import {
  registerMigrant,
  getMigrantById,
  updateMigrant,
  deleteMigrant,
  verifyMigrant,
  listMigrants,
  getMyProfile,
  updateMyProfile
} from "../controllers/migrant.controller.js";

import { migrantLogin, migrantLogout } from "../controllers/migrantAuth.controller.js";
import migrantAuth from "../middleware/migrantAuth.middleware.js";

import adminAuth from "../middleware/adminAuth.middleware.js";


const router = express.Router();

router.get("/", adminAuth, listMigrants);
router.get("/:migrantId", adminAuth, getMigrantById);
router.put("/:migrantId", adminAuth, updateMigrant);
router.delete("/:migrantId", adminAuth, deleteMigrant);
router.put("/verify/:migrantId", adminAuth, verifyMigrant);


router.post("/register", registerMigrant);
router.post("/login", migrantLogin);

router.post("/logout", migrantAuth, migrantLogout);

router.get("/me/profile", migrantAuth, getMyProfile);
router.put("/me/profile", migrantAuth, updateMyProfile);

export default router;




