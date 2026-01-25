import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const registerUser = asyncHandler( async (req, res) => {
    const { username, name, email, password } = req.body;
    console.log("Username: "+ username);

    if([username, name, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are mandatory!");
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existingUser){
        throw new ApiError(409, "Username/Email already exists!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        name,
        email,
        passwordHash: hashedPassword
    })

    if(!user){
        throw new ApiError(500, "unable to register user, please try again later!");
    }

    console.log("Registered User: "+ user);
    return res.status(201).json(
        new ApiResponse(201, 
        {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl
        }
        , "User registered successfully!")
    )
})

const loginUser = asyncHandler( async (req, res) => {
    
})

export {registerUser}