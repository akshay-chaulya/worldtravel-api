import { Router } from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { singleUpload, verifyAuth } from "../middleware/index.js";

const router = Router();

router.get("/check-auth", verifyAuth, checkAuth);
router.post("/signup", singleUpload, signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
