import express from "express";
import {
  list,
  findAUser,
  updateAUser,
  deleteAUser,
  changeUserPassword
} from "../controllers/profile";
import authenticate, { authOptional } from "../middleware/authenticate";
import {
  validateUpdateUser,
  validatePasswordAddress
} from "../middleware/index";

const router = express.Router();

router.get("/", [authenticate], list);
router.get("/:email", [authenticate], findAUser);
router.delete("/:email", [authenticate], deleteAUser);
router.patch("/:email", [authenticate, validateUpdateUser], updateAUser);
router.put(
  "/change-password",
  [authenticate, validatePasswordAddress],
  changeUserPassword
);

export default router;
