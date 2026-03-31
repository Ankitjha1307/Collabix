import ApiError from "./ApiError";
import { WorkspaceMember } from "../models/workspaceMember.model";

export const validateWorkspaceUser = async (workspaceId, userId) => {
    const membership = await WorkspaceMember.findOne({ workspaceId, userId });
    if (!membership) {
        throw new ApiError(403, "User not part of workspace");
    }

    return membership;
};