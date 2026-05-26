import {Workspace} from "../models/workspace.model.js";
import {WorkspaceMember} from "../models/workspaceMember.model.js";
import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createWorkspace = asyncHandler(async(req, res) => {
        const { name } = req.body;
        const userId = req.user.id;

        if (!name || !name.trim()) {
            throw new ApiError(400, "Workspace name required!");
        }

        const workspace = await Workspace.create({
            name: name.trim(),
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

const updateWorkspace = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
        throw new ApiError(400, "Workspace name required!");
    }

    const workspace = await Workspace.findByIdAndUpdate(
        workspaceId,
        { name: name.trim() },
        { new: true }
    );

    if (!workspace) {
        throw new ApiError(404, "Workspace not found");
    }

    return res.status(200)
    .json(new ApiResponse(200, workspace, "Workspace updated successfully"));
});

const deleteWorkspace = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    
    
    const workspace = await Workspace.findByIdAndDelete(workspaceId);

    if(!workspace){
        throw new ApiError(404, "Workspace not found");
    }

    await WorkspaceMember.deleteMany({ workspaceId });

    return res.status(200)
    .json(new ApiResponse(200, null, "Workspace deleted successfully!") );
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

    return res.status(200)
    .json(new ApiResponse(200, workspaces, "User workspaces fetched successfully!"));
})

const getWorkspaceById = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    
    const workspace = await Workspace.findById(workspaceId);

    if(!workspace){
        throw new ApiError(404, "Workspace not found!");
    }

    return res.status(200)
    .json(
        new ApiResponse(200, {workspace, role: req.workspaceRole}, "Workspace fetched successfully")
  );
})

const inviteToWorkspace = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    const { username, role } = req.body;
    const userId = req.user.id;
    if (!username || !username.trim()) {
        throw new ApiError(400, "Username is required to invite a member!");
    }

    const inviteRole = role || "MEMBER";
    const userToInvite = await User.findOne({ username });

    if (!userToInvite) {
        throw new ApiError(404, "User not found");
    }

    if(userToInvite._id.toString() === userId.toString()){
        throw new ApiError(400, "Self-invitation is not allowed!");
    }

    const existingMembership = await WorkspaceMember.findOne({
        workspaceId,
        userId: userToInvite._id
    })

    if(existingMembership){
        throw new ApiError(400, "User is already a member of this workspace!");
    }

    await WorkspaceMember.create({
        workspaceId,
        userId: userToInvite._id,
        role: inviteRole
    });

    return res.status(201)
    .json(new ApiResponse(201, null, `User ${username} invited to workspace successfully as ${inviteRole}!`));
})

const removeFromWorkspace = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    const { userIdToRemove } = req.body;
    const userId = req.user.id;

    if(userIdToRemove === userId.toString()){
        throw new ApiError(400, "Self-removal is not allowed! Owners cannot remove themselves from the workspace.");
    }

    const membershipToRemove = await WorkspaceMember.findOne({
        workspaceId,
        userId: userIdToRemove
    })

    if(!membershipToRemove){
        throw new ApiError(404, "Membership not found! The user is not a member of this workspace.");
    }

    await WorkspaceMember.deleteOne({
        workspaceId,
        userId: userIdToRemove
    })

    return res.status(200)
    .json(new ApiResponse(200, null,`User ${userIdToRemove} removed from workspace successfully!` ))
})

const updateMemberRole = asyncHandler(async (req, res) => {
    const { workspaceId } = req.params;
    const {usernameToUpdate, newRole } = req.body;
    const userId = req.user.id;

    if (!usernameToUpdate || !usernameToUpdate.trim()) {
        throw new ApiError(400, "Username is required to update a member's role!");
    }

    const userToUpdate = await User.findOne({ 
        username: usernameToUpdate 
    });

    if (!userToUpdate) {
        throw new ApiError(404, "User not found");
    }

    if(userToUpdate._id.toString() === userId.toString()){
        throw new ApiError(400, "Self-role update is not allowed! Owners cannot change their own role.");
    }

    const membershipToUpdate = await WorkspaceMember.findOne({
        workspaceId,
        userId: userToUpdate._id
    })

    if(!membershipToUpdate){
        throw new ApiError(404, "Membership not found! The user is not a member of this workspace");
    }

    if (membershipToUpdate.role === "OWNER") {
    throw new ApiError(400, "Cannot modify another OWNER");
  }

    membershipToUpdate.role = newRole;
    await membershipToUpdate.save();

    return res.status(200)
    .json(new ApiResponse(200, null, `Member role of ${usernameToUpdate} updated to ${newRole} successfully!`));
})

const listWorkspaceMembers = asyncHandler(async (req, res) => {
    const {workspaceId} = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const members = await WorkspaceMember.find({ workspaceId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("userId", "username email")
    .select("userId role");

    const totalMembers = await WorkspaceMember.countDocuments({ workspaceId });
    

    return res.status(200)
    .json(new ApiResponse(200,
     { members, page, totalPages: Math.ceil(totalMembers / limit), totalMembers }, 
     "Workspace members retrieved successfully!"));
})

export { createWorkspace, updateWorkspace, deleteWorkspace, getUserWorkspaces, getWorkspaceById, inviteToWorkspace, removeFromWorkspace, updateMemberRole, listWorkspaceMembers };