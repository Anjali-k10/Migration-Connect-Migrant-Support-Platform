import express from "express";
import {
  addHelpCenter,
  listHelpCenters,
  getCheapestShelters
} from "../controllers/helpCenter.controller.js";

const router = express.Router();

router.post("/add", addHelpCenter);
router.get("/", listHelpCenters);
router.get("/cheapest", getCheapestShelters);


export default router;

