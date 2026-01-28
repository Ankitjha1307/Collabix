const mongoose = require('mongoose');

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
    },
    refreshToken: {
        type: String
    }
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', userSchema);