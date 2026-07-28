import {User} from "../models/user.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import jwt from "jsonwebtoken";

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized Access! Refresh Token not found!");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.userId);

        if(!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Unauthorized Access! User not found or invalid refresh token!");
        }

        const newAccessToken = generateAccessToken(user._id);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    accessToken: newAccessToken
                },
                "Access Token refreshed successfully!"
            )
        )
    } catch (error) {
        throw new ApiError(401, "Unauthorized Access! Invalid Refresh Token!");
    }
})

const registerUser = asyncHandler( async (req, res) => {
    const { username, name, email, password } = req.body;
    console.log("Username: "+ username);

    if([username, name, email, password].some((field) => !field?.trim())){
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
    const {username, email, password} = req.body;

    if(!((username || email) && password)){
        throw new ApiError(400, "Username/Email and Password are required to login!");
    }

    const user = await User.findOne({
        $or: [{username},{email}]
    }).select("+passwordHash");

    if(!user){
        throw new ApiError(401, "User does not exist!")
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Credentials!");
    }

    const accessToken = generateAccessToken(user._id);
    if(!accessToken) {
        throw new ApiError(500, "Could not generate access token, please try again later!");
    }

    const refreshToken = generateRefreshToken(user._id);
    if(!refreshToken) {
        throw new ApiError(500, "Could not generate refresh token, please try again later!");
    }

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
    new ApiResponse(
      200,
      {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          avatarUrl: user.avatarUrl
        }
      },
      "Login successful!"
    )
  );
})

const logoutUser = asyncHandler( async ( req, res) => {
    await User.findByIdAndUpdate(req.userId, 
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
    } 

    res
    .clearCookie("refreshToken")
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                _id: req.user._id,
                name: req.user.name,
                username: req.user.username,
                email: req.user.email,
                avatarUrl: req.user.avatarUrl,
                avatarUrl: req.user.avatarUrl,
                createdAt: req.user.createdAt
            },
            "Profile retrieved successfully"
        )
    );
});

export { refreshAccessToken, registerUser, loginUser, logoutUser, getCurrentUser }