import {asyncHandler} from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/apiError.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if(!token) {
            throw new ApiError(401, "Unauthorized Access! Token not found!");
        }
        console.log("Token: ", token);

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

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