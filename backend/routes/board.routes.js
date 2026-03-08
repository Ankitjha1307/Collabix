import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import requireWorkspaceRole from "../middlewares/workspaceRole.middleware.js";

import {
  createBoard,
  getBoardsByWorkspace,
  getBoardById,
  updateBoard,
  deleteBoard
} from "../controllers/board.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN"),
  createBoard
);

router.get(
  "/workspace/:workspaceId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN", "MEMBER"),
  getBoardsByWorkspace
);

router.get(
  "/:boardId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN", "MEMBER"),
  getBoardById
);

router.patch(
  "/:boardId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN"),
  updateBoard
);

router.delete(
  "/:boardId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN"),
  deleteBoard
);

export default router;