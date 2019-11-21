import express from "express";
import {
  create,
  confirmed,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/user";
import {
  validateCreateUser,
  validateLoginUser,
  validateEmailAddress,
  validatePasswordAddress
} from "../middleware/index";

const router = express.Router();

router.post("/signup", [validateCreateUser], create);
router.patch("/confirmation/:token", confirmed);
router.post("/signin", [validateLoginUser], login);
router.post("/forgot-password", [validateEmailAddress], forgotPassword);
router.patch(
  "/reset-password/:token",
  [validatePasswordAddress],
  resetPassword
);

export default router;
