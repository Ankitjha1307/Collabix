import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createComment = asyncHandler(async(req, res) => {
    const { content, mentions = [] } = req.body;
    const { taskId } = req.params; 
    const userId = req.user._id;

    if(!content) {
        throw new ApiError(400, "Content is required");
    }

    const task = await Task.findById(taskId);
    if(!task) {
        throw new ApiError(404, "Task not found");
    }

    const validMentions = mentions.filter(id => mongoose.Types.ObjectId.isValid(id));

    const comment = await Comment.create({
        content,
        author: userId,
        taskId,
        mentions: validMentions
    });


    return res.status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully"));
});

const getTaskComments = asyncHandler(async(req, res) => {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if(!task) {
        throw new ApiError(404, "Task not found");
    }

    const comments = await Comment.find({ taskId })
    .populate('author', 'name username')
    .populate('mentions', 'name username')

    return res.status(200)
    .json(new ApiResponse(200, comments, "Task comments retrieved successfully"));
});

export { createComment, getTaskComments };