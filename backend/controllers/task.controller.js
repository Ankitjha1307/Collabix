import mongoose from 'mongoose';
import Task from '../models/task.model.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Board } from '../models/board.model.js';


const createTask = asyncHandler(async (req, res) => {
    const {name, description, status, priority, assignedTo, dueDate} = req.body;
    const { boardId } = req.params;

    if (!name || !name.trim()) {
        throw new ApiError(400, "Task name is required!");
    }

    const board = await Board.findById(boardId);
    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });
    if (!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    const task = await Task.create({
        name: name.trim(),
        description: description ? description.trim() : "",
        status: status || "TODO",
        priority: priority || "MEDIUM",
        assignedTo: assignedTo || req.user._id,
        dueDate: dueDate || null,
        board: boardId
    });

    return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getBoardTasks = asyncHandler(async (req, res) => {
    const { boardId } = req.params;
    const board = await Board.findById(boardId);

    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });

    if (!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    const tasks = await Task.find({ board: boardId });

    return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const {name, description, status, priority, assignedTo, dueDate} = req.body;
    const { boardId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const board = await Board.findById(boardId);
    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });

    if (!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    task.name = name ? name.trim() : task.name;
    task.description = description ? description.trim() : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedTo = assignedTo || task.assignedTo;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { boardId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const board = await Board.findById(boardId);
    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });
    if(!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    await Task.findByIdAndDelete(taskId);

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});

const assignTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { userId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const board = await Board.findById(task.boardId);
    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });

    if (!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    task.assignedTo = userId;
    await task.save();

    return res
    .status(200)
    .json(new ApiResponse(200, task, "Task assigned successfully"));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    const board = await Board.findById(task.boardId);
    if (!board) {
        throw new ApiError(404, "Board not found");
    }

    const membership = await WorkspaceMember.findOne({
        workspaceId: board.workspaceId,
        userId: req.user._id
    });

    if (!membership) {
        throw new ApiError(403, "You are not a member of this workspace");
    }

    if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    task.status = status;
    await task.save();

    return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

export { createTask, getBoardTasks, updateTask, deleteTask, assignTask, updateTaskStatus };