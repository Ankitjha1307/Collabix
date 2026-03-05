import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    },
    {timestamps: true}
);

workspaceSchema.index({ createdBy: 1, name: 1 }, { unique: true });

export const Workspace = mongoose.model('Workspace', workspaceSchema);