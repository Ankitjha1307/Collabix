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
router.get("/profile", verifyToken, (req, res) => {
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
        avatarUrl: req.user.avatarUrl
    });
});
router.post("/logout", verifyToken, logoutUser);

export default router;
