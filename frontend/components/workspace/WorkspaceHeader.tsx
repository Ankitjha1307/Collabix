"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBoardDialog from "@/components/board/CreateBoardDialog";
import WorkspaceSettingsDialog from "./WorkspaceSettingsDialog";
import type { Workspace } from "@/types/workspace";
import type { Board } from "@/types/board";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  onWorkspaceUpdated: (workspace: Workspace) => void;
  onBoardCreated: (board: Board) => void;
}

export default function WorkspaceHeader({
    workspace,
    onWorkspaceUpdated,
    onBoardCreated
} : WorkspaceHeaderProps ) {
    const [open, setOpen] = useState(false);
    return (
    <div className="space-y-6">
        <Button
            variant="ghost"
            asChild
            className="w-fit"
        >
            <Link href="/dashboard/workspaces">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workspaces
            </Link>
        </Button>

        <div className="flex items-end justify-between">
            <div><h1 className="text-4xl font-bold">{workspace.name}</h1></div>
            <div className="flex items-center gap-3">
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Board
                </Button>

                <WorkspaceSettingsDialog
                    workspace={workspace}
                    onWorkspaceUpdated={onWorkspaceUpdated}
                />
            </div>
        </div>

        <CreateBoardDialog
            open={open}
            onOpenChange={setOpen}
            workspaceId={workspace._id}
            onBoardCreated={onBoardCreated}
        />
    </div>
);
}