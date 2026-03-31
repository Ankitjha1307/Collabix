import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";
import Board from "../models/board.model";
import Task from "../models/task.model";

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

    else {
        throw new ApiError(500, "Invalid workspace attachment type");
    }

    req.workspaceId = workspaceId;

    next();
});