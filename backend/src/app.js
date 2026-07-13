import dotenv from "dotenv";
dotenv.config();
import userRoutes from "../routes/user.routes.js";
import WorkspaceRoutes from "../routes/workspace.routes.js";
import BoardRoutes from "../routes/board.routes.js";
import TaskRoutes from "../routes/task.routes.js";
import CommentRoutes from "../routes/comment.routes.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "../middlewares/error.middleware.js";

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// test route
app.get("/test", (req, res) => {res.send("Collabix API is working!");});

// mount routes
app.use("/api/auth", userRoutes);
app.use("/api/workspaces", WorkspaceRoutes);
app.use("/api/boards", BoardRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api", CommentRoutes);

// Global error handler middleware
app.use(errorHandler);

export default app;