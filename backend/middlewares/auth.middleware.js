import {asyncHandler} from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import { generateAccessToken } from '../utils/token.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if(!token) {
            throw new ApiError(401, "Unauthorized Access! Token not found!");
        }
        console.log("Token: ", token);

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.userId);

        if(!user) {
            throw new ApiError(401, "Unauthorized Access! User not found!");
        }
        console.log("User: ", user);

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized Access! In valid Access Token!");
    }
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
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

        const newAccessToken = generateAccessToken(user.userId);

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