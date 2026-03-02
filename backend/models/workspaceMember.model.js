const mongoose = require('mongoose');

const workspaceMemberSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        enum: ["OWNER", "ADMIN", "MEMBER"],
        default: "MEMBER"
    }
    },
    {timestamps: true}
);

workspaceMemberSchema.index(
  { workspaceId: 1, userId: 1 },
  { unique: true }
);

workspaceMemberSchema.index({ userId: 1 });
workspaceMemberSchema.index({ workspaceId: 1 });

module.exports = mongoose.model("WorkspaceMember", workspaceMemberSchema);