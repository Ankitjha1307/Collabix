"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import BoardCard from "./BoardCard";
import EmptyBoards from "./EmptyBoards";
import CreateBoardDialog from "./CreateBoardDialog";

import type { Board } from "@/types/board";

interface Props {
  boards: Board[];
  workspaceId: string;
  onBoardCreated: (board: Board) => void;
}

export default function BoardSection({
  boards,
  workspaceId,
  onBoardCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Boards
        </h2>

        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Board
        </Button>
      </div>

      <div className="mt-6">
        {boards.length === 0 ? (
          <EmptyBoards
            onCreate={() => setOpen(true)}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {boards.map((board) => (
              <BoardCard
                key={board._id}
                id={board._id}
                workspaceId={workspaceId}
                name={board.name}
                updatedAt={board.updatedAt}
              />
            ))}
          </div>
        )}
      </div>

      <CreateBoardDialog
        open={open}
        onOpenChange={setOpen}
        workspaceId={workspaceId}
        onBoardCreated={onBoardCreated}
      />
    </>
  );
}