import {asyncHandler} from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';

export const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if(!token) {
            throw new ApiError(401, "Unauthorized Access! Token not found!");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.userId);

        if(!user) {
            throw new ApiError(401, "Unauthorized Access! User not found!");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(
            401,
            "Unauthorized Access! Invalid Access Token!"
        );
    }
})