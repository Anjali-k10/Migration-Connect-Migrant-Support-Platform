import express from "express";
import {
  addHelpCenter,
  listHelpCenters,
  getCheapestShelters,
    getNearestHelpCenters,
    getCheapestFoodCenters
} from "../controllers/helpCenter.controller.js";

const router = express.Router();

router.post("/add", addHelpCenter);
router.get("/", listHelpCenters);
router.get("/cheapest", getCheapestShelters);
router.get("/nearest", getNearestHelpCenters);
router.get("/cheapest-food", getCheapestFoodCenters);


export default router;

