import express from "express";
import {
  addHelpCenter,
  listHelpCenters
} from "../controllers/helpCenter.controller.js";

const router = express.Router();

router.post("/add", addHelpCenter);
router.get("/", listHelpCenters);

export default router;

