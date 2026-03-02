import Workspace from "../models/workspace.model";
import WorkspaceMember from "../models/workspaceMember.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const createWorkspace = asyncHandler(async(req, res) => {
        const { name } = req.body;
        const userId = req.user.id;

        if (!name || !name.trim()) {
            throw new ApiError(400, "Workspace name required!");
        }

        const workspace = await Workspace.create({
            name,
            createdBy: userId
        });

        await WorkspaceMember.create({
            workspaceId: workspace._id,
            userId,
            role: "OWNER"
        });

        res.status(201)
        .json(new ApiResponse(201, 
        workspace,
        "New workspace created successfully!"))
    
})

const getUserWorkspaces = asyncHandler(async(req, res) => {
    const userId = req.user.id;

    const memberships = await WorkspaceMember.find({ userId }).select("workspaceId");

    if (!memberships.length) {
        return res.status(200)
        .json(new ApiResponse(200, [], "No workspaces found!"));
    }

    const workspaceIds = memberships.map(member => member.workspaceId);

    const workspaces = await Workspace.find({
        _id: { $in: workspaceIds}
    }).sort({ createdAt: -1});

    res.status(200)
    .json(new ApiResponse(200, workspaces, "User workspaces fetched successfully!"));
})

const getWorkspaceById = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    const userId = req.user.id;

    const membership = await WorkspaceMember.findOne({
        workspaceId,
        userId
    });

    if(!membership){
        throw new ApiError(403, "Access denied!");   
    }

    const workspace = await Workspace.findById(workspaceId);

    if(!workspace){
        throw new ApiError(404, "Workspace not found!");
    }

    return res.status(200)
    .json(
        new ApiResponse(200, {workspace, role: membership.role}, "Workspace fetched successfully")
  );
})

export { createWorkspace, getUserWorkspaces, getWorkspaceById };