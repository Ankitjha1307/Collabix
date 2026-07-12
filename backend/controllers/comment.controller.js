import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const createComment = asyncHandler(async(req, res) => {
    const { content, mentions = [] } = req.body;
    const { taskId } = req.params; 
    const userId = req.user._id;

    if(!content) {
        throw new ApiError(400, "Content is required");
    }

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw new ApiError(400, "Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if(!task) {
        throw new ApiError(404, "Task not found");
    }

    const validMentions = [...new Set(
        mentions.filter(id => mongoose.Types.ObjectId.isValid(id))
    )];

    const filteredMentions = validMentions.filter(
        id => id.toString() !== userId.toString()
    );

    const comment = await Comment.create({
        content,
        author: userId,
        taskId,
        mentions: filteredMentions
    });

    const populatedComment = await Comment.findById(comment._id)
    .populate("author", "name username")
    .populate("mentions", "name username");

    return res.status(201)
    .json(new ApiResponse(201, populatedComment, "Comment created successfully"));
});

const getTaskComments = asyncHandler(async(req, res) => {
    const { taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
        throw new ApiError(400, "Invalid task ID");
    }

    const task = await Task.findById(taskId);
    if(!task) {
        throw new ApiError(404, "Task not found");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const comments = await Comment.find({ taskId })
    .populate('author', 'name username')
    .populate('mentions', 'name username')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const totalComments = await Comment.countDocuments({ taskId });
    const totalPages = Math.ceil(totalComments / limit);

    return res.status(200)
    .json(new ApiResponse(200, 
    { comments, 
        pagination: {
            totalComments,
            totalPages,
            currentPage: page,
            limit
        }, 
    }, "Task comments retrieved successfully"));
});

const deleteComment = asyncHandler(async(req, res) => {
    const { commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(commentId);
    if(!comment) {
        throw new ApiError(404, "Comment not found");
    }
    if (
        comment.author.toString() !== req.user._id.toString() &&
        !["OWNER", "ADMIN"].includes(req.workspaceRole)
    ) {
        throw new ApiError(403, "Not allowed to delete this comment");
    }
    await comment.deleteOne();
    return res.status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
})

export { createComment, getTaskComments, deleteComment };