const express = require("express");

const app = express();

//middleware
app.use(express.json());

// test route
app.get("/test", (req, res) => {
    res.send("Collabix API is working!");
});

module.exports = app;