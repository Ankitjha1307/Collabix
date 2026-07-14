"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTaskDialog from "./CreateTaskDialog";
import type { Board } from "@/types/board";
import type { Task } from "@/types/task";
import BoardSettingsDialog from "./BoardSettingsDialog";

interface BoardHeaderProps {
  board: Board;
  workspaceId: string;
  onBoardUpdated: (board: Board) => void;
  onTaskCreated: (task: Task) => void;
}

export default function BoardHeader({
    board,
    workspaceId,
    onBoardUpdated,
    onTaskCreated
} : BoardHeaderProps ) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="w-fit"
      >
        <Link href={`/dashboard/workspaces/${workspaceId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workspace
        </Link>
      </Button>

      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">{board.name}</h1>
          {board.description && (
              <p className="mt-2 text-muted-foreground">{board.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>

          <BoardSettingsDialog
            board={board}
            workspaceId={workspaceId}
            onBoardUpdated={onBoardUpdated}
          />
        </div>

        <CreateTaskDialog
          open={open}
          onOpenChange={setOpen}
          boardId={board._id}
          workspaceId={workspaceId}
          onTaskCreated={onTaskCreated}
        />
      </div>
    </div>
  );
}