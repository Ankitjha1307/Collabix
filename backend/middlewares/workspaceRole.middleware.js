import {WorkspaceMember} from "../models/workspaceMember.model.js";
import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireWorkspaceRole = (...allowedRoles) => asyncHandler(async (req, res, next) => {
    const workspaceId = req.workspaceId || req.params?.workspaceId || req.body?.workspaceId;

    const membership = await WorkspaceMember.findOne({
        workspaceId,
        userId: req.user._id
    });

    if (!membership) {
        throw new ApiError(403, "Not a member of this workspace");
    }

    if (allowedRoles.length && !allowedRoles.includes(membership.role)) {
        throw new ApiError(403, "Insufficient permissions");
    }

    req.workspaceRole = membership.role;
    
    next(); 
});