import {ApiError} from "./ApiError.js";
import { WorkspaceMember } from "../models/workspaceMember.model.js";

export const validateWorkspaceUser = async (workspaceId, userId) => {
    const membership = await WorkspaceMember.findOne({ workspaceId, userId });
    if (!membership) {
        throw new ApiError(403, "User not part of workspace");
    }

    return membership;
};