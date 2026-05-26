import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {Board} from "../models/board.model.js";
import {Task} from "../models/task.model.js";
import {Comment} from "../models/comment.model.js";

export const attachWorkspace = (type) => asyncHandler(async (req, res, next) => {
    let workspaceId;

    if (type === "board") {
        const { boardId } = req.params;

        const board = await Board.findById(boardId);
        if (!board) {
            throw new ApiError(404, "Board not found");
        }

        workspaceId = board.workspaceId;
        req.board = board;
    }

    else if (type === "task") {
        const { taskId } = req.params;

        const task = await Task.findById(taskId);
        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        const board = await Board.findById(task.boardId);
        if (!board) {
            throw new ApiError(404, "Board not found");
        }

        workspaceId = board.workspaceId;
        req.task = task;
    }

    else if (type === "comment") {
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw new ApiError(404, "Comment not found");
        }

        const task = await Task.findById(comment.taskId);

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        const board = await Board.findById(task.boardId);

        if (!board) {
            throw new ApiError(404, "Board not found");
        }

        workspaceId = board.workspaceId;

        req.comment = comment;
    }

    else {
        throw new ApiError(500, "Invalid workspace attachment type");
    }

    req.workspaceId = workspaceId;

    next();
});