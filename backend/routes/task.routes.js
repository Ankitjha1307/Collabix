import { Router } from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireWorkspaceRole} from "../middlewares/workspaceRole.middleware.js";
import {attachWorkspace} from "../middlewares/attachWorkspace.middleware.js";

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
  attachWorkspace("board"),
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  createTask
);

router.get(
  "/board/:boardId",
  verifyToken,
  attachWorkspace("board"),
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  getBoardTasks
);

router.patch(
  "/:taskId",
  verifyToken,
  attachWorkspace("task"),
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  updateTask
);

router.delete(
  "/:taskId",
  verifyToken,
  attachWorkspace("task"),
  requireWorkspaceRole("OWNER","ADMIN"),
  deleteTask
);

router.patch(
  "/:taskId/assign",
  verifyToken,
  attachWorkspace("task"),
  requireWorkspaceRole("OWNER","ADMIN"),
  assignTask
);

router.patch(
  "/:taskId/status",
  verifyToken,
  attachWorkspace("task"),
  requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
  updateTaskStatus
);

export default router;