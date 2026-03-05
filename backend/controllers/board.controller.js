import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Board } from "../models/board.model.js";
import { Workspace } from "../models/workspace.model.js";
import { WorkspaceMember } from "../models/workspaceMember.model.js";

const createBoard = asyncHandler(async (req, res) => {
  const { name, description, workspaceId } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Board name is required!");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const membership = await WorkspaceMember.findOne({
    workspaceId,
    userId: req.user._id
  });

  if (!membership || !["OWNER", "ADMIN"].includes(membership.role)) {
    throw new ApiError(
      403,
      "Only OWNER or ADMIN can create boards"
    );
  }

  const board = await Board.create({
    name: name.trim(),
    description: description ? description.trim() : "",
    workspaceId,
    createdBy: req.user._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, board, "Board created successfully!"));
});


const getBoardsByWorkspace = asyncHandler(async (req, res) => {
  const { workspaceId } = req.params;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new ApiError(404, "Workspace not found");
  }

  const membership = await WorkspaceMember.findOne({
    workspaceId,
    userId: req.user._id
  });

  if (!membership) {
    throw new ApiError(403, "Access denied to this workspace");
  }

  const boards = await Board.find({ workspaceId });

  return res
    .status(200)
    .json(new ApiResponse(200, boards, "Boards fetched successfully!"));
});

export { createBoard, getBoardsByWorkspace };