import express from "express";
import { registerUser, loginUser, refreshAccessToken, logoutUser} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { Router } from "express"

const router = Router();

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// protected routes
router.post("/logout", verifyToken, logoutUser);

export default router;
