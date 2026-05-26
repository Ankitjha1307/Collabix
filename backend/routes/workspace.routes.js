import { Router } from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireWorkspaceRole} from "../middlewares/workspaceRole.middleware.js";
import {attachWorkspace} from "../middlewares/attachWorkspace.middleware.js";

import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  inviteToWorkspace,
  removeFromWorkspace,
  updateMemberRole,
  listWorkspaceMembers
} from "../controllers/workspace.controller.js";

const router = Router();

router.post("/", verifyToken, createWorkspace);

router.get("/", verifyToken, getUserWorkspaces);

router.get(
  "/:workspaceId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN", "MEMBER"),
  getWorkspaceById
);

router.patch(
  "/:workspaceId",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN"),
  updateWorkspace
);

router.delete(
  "/:workspaceId",
  verifyToken,
  requireWorkspaceRole("OWNER"),
  deleteWorkspace
);

router.post(
  "/:workspaceId/invite",
  verifyToken,
  requireWorkspaceRole("OWNER"),
  inviteToWorkspace
);

router.delete(
  "/:workspaceId/remove",
  verifyToken,
  requireWorkspaceRole("OWNER"),
  removeFromWorkspace
);

router.patch(
  "/:workspaceId/role",
  verifyToken,
  requireWorkspaceRole("OWNER"),
  updateMemberRole
);

router.get(
  "/:workspaceId/members",
  verifyToken,
  requireWorkspaceRole("OWNER", "ADMIN", "MEMBER"),
  listWorkspaceMembers
);

export default router;