import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

//MongoDB connection test
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connected successfully!!");
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
    });
})
.catch((err) => {
    console.log("MongoDB connection error: ", err)
    process.exit(1);
    });