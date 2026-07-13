import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
            data: null,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [],
        data: null,
    });
};