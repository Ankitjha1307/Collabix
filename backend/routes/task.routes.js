import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import requireWorkspaceRole from "../middlewares/workspaceRole.middleware.js";

import {
  createTask,
  getBoardTasks,
  updateTask,
  deleteTask,
  assignTask,
  updateTaskStatus
} from "../controllers/task.controller.js";

const router = Router();

router.post(
  "/board/:boardId",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  createTask
);

router.get(
  "/board/:boardId",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  getBoardTasks
);

router.patch(
  "/:taskId",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  updateTask
);

router.delete(
  "/:taskId",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN"),
  deleteTask
);

router.patch(
  "/:taskId/assign",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN"),
  assignTask
);

router.patch(
  "/:taskId/status",
  verifyToken,
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  updateTaskStatus
);

export default router;