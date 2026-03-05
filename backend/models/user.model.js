import mongoose from "mongoose";

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
        required: true, 
        trim: true
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
        required: true,
        select: false
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    refreshToken: {
        type: String,
        select: false
    }
    },
    {timestamps: true}
);

export const User = mongoose.model('User', userSchema);