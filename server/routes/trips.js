import express from "express";

import {
  validateTrips,
  validateTripsEdit,
  validateDepDest
} from "../middleware/index";
import { create, list, findOne, deleteOne, edit } from "../controllers/trips";
import authenticate, { authOptional } from "../middleware/authenticate";
import { validateQuery } from "../middleware/index";

const router = express.Router();

router.post("/", [authenticate, validateTrips, validateDepDest], create);
router.get("/", [authOptional, validateQuery], list);
router.get("/:id", [authOptional], findOne);
router.delete("/:id", [authenticate], deleteOne);
router.patch("/:id", [authenticate, validateTripsEdit, validateDepDest], edit);

export default router;
