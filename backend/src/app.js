require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//middleware
app.use(express.json());

// test route
app.get("/test", (req, res) => {
    res.send("Collabix API is working!");
});

//MongoDB connection test
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully!!"))
.catch((err) => console.log("MongoDB connection error: ", err));

module.exports = app;