import {Task} from '../models/task.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { validateWorkspaceUser } from '../utils/validateWorkspaceUser.js';
import mongoose from 'mongoose';


const createTask = asyncHandler(async (req, res) => {
    const {name, description, status, priority, assignedTo, dueDate} = req.body;
    const { boardId } = req.params;

    if (!name || !name.trim()) {
        throw new ApiError(400, "Task name is required!");
    }

    if (assignedTo) {
        await validateWorkspaceUser(req.workspaceId, assignedTo);
    }

    const task = await Task.create({
        name: name.trim(),
        description: description ? description.trim() : "",
        status: status || "TODO",
        priority: priority || "MEDIUM",
        assignedTo: assignedTo || req.user._id,
        dueDate: dueDate || null,
        boardId: boardId,
        createdBy: req.user._id
    });

    return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getBoardTasks = asyncHandler(async (req, res) => {
    const { boardId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ boardId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments({ boardId });

    return res
    .status(200)
    .json(new ApiResponse(200,
     { tasks, page, totalPages: Math.ceil(totalTasks / limit), totalTasks }, 
     "Tasks retrieved successfully"));
});

const updateTask = asyncHandler(async (req, res) => {
    const task = req.task; 
    const {name, description, status, priority, assignedTo, dueDate} = req.body;
    
    if (name && !name.trim()) {
        throw new ApiError(400, "Task name cannot be empty");
    }

    if (assignedTo) {
        await validateWorkspaceUser(req.workspaceId, assignedTo);
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
    const task = req.task;

    await task.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Task deleted successfully"));
});

const assignTask = asyncHandler(async (req, res) => {
    const task = req.task;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    await validateWorkspaceUser(req.workspaceId, userId);

    task.assignedTo = userId;
    await task.save();

    return res
    .status(200)
    .json(new ApiResponse(200, task, "Task assigned successfully"));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const task = req.task;
    const { status } = req.body;

    if (!["TODO", "IN_PROGRESS", "DONE"].includes(status)) {
        throw new ApiError(400, "Invalid status value");
    }

    if (task.assignedTo && task.assignedTo.toString() !== req.user._id.toString() &&
        !["OWNER", "ADMIN"].includes(req.workspaceRole)) {
            throw new ApiError(403, "Not allowed to update this task");
    }
    
    
    task.status = status;
    await task.save();

    return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

export { createTask, getBoardTasks, updateTask, deleteTask, assignTask, updateTaskStatus };