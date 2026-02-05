import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());

// test route
app.get("/test", (req, res) => {
    res.send("Collabix API is working!");
});

//MongoDB connection test
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully!!"))
.catch((err) => console.log("MongoDB connection error: ", err));

// mount routes
app.use("/api/auth", userRoutes);

export default app;