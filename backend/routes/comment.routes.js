import { Router } from "express";
import {verifyToken} from "../middlewares/auth.middleware.js";
import {requireWorkspaceRole} from "../middlewares/workspaceRole.middleware.js";
import {attachWorkspace} from "../middlewares/attachWorkspace.middleware.js";

import {createComment, getTaskComments, deleteComment } from "../controllers/comment.controller.js";

const router = Router();

router.post(
    "/tasks/:taskId/comments",
    verifyToken,
    attachWorkspace("task"),
    requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
    createComment
);

router.get(
    "/tasks/:taskId/comments",
    verifyToken,
    attachWorkspace("task"),
    requireWorkspaceRole("OWNER","ADMIN","MEMBER"),
    getTaskComments
);

router.delete(
    "/comments/:commentId",
    verifyToken,
    attachWorkspace("comment"),
    requireWorkspaceRole("OWNER","ADMIN"),
    deleteComment
);

export default router;