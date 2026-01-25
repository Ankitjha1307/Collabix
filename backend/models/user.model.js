const mongoose = require('mongoose');
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true ,
        trim: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: ""
    }
    },
    {timestamps: true}
);

userSchema.methods.generateAccessToken = function() {
     jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
     )
}

module.exports = mongoose.model('User', userSchema);