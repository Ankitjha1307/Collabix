"use client";

import { useState } from "react";
import { createBoard } from "@/services/board.service";
import type { Board } from "@/types/board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  onBoardCreated: (board: Board) => void;
}

export default function CreateBoardDialog({
  open,
  onOpenChange,
  workspaceId,
  onBoardCreated,
}: CreateBoardDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setError("");
  };

  const handleCreateBoard = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (!name.trim()){
        setError("Board name is required");
        return;
      }
      setIsCreating(true);
      setError("");

      const response = await createBoard(
        workspaceId,
        name,
        description
      );

      onBoardCreated(response.data);
      resetForm();
      onOpenChange(false);
    } catch (error: any) {
        console.error(error);
        setError(
            error.response?.data?.message ??
            "Failed to create board."
        );
      } finally {
        setIsCreating(false);
      }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
      }

      onOpenChange(isOpen);
    }}>
      <DialogContent>
        <form
          onSubmit={handleCreateBoard}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Create Board</DialogTitle>

            <DialogDescription>
              Create a board inside this workspace.
            </DialogDescription>
          </DialogHeader>

          <fieldset className="space-y-5 py-2" disabled={isCreating}>
            <div className="space-y-2">
              <Label htmlFor="board-name">Board Name</Label>

              <Input
                id="board-name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="e.g. Sprint Planning"
                autoFocus
                maxLength={60}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="board-description">Description</Label>

              <Textarea
                id="board-description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Plan the current development sprint and track progress."
                rows={4}
                maxLength={250}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive"> {error} </p>
            )}
          </fieldset>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isCreating || !name.trim()}
            >
              {isCreating ? "Creating..." : "Create Board"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}