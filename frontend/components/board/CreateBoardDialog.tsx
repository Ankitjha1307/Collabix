"use client";

import { useState } from "react";
import { createBoard } from "@/services/board.service";
import type { Board } from "@/types/board";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup } from "@/components/ui/field";

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

  const handleCreateBoard = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (!name.trim()) return;

      const response = await createBoard(
        workspaceId,
        name,
        description
      );

      onBoardCreated(response.data);

      setName("");
      setDescription("");

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

          <FieldGroup>
            <Field>
              <Label htmlFor="board-name">
                Board Name
              </Label>

              <Input
                id="board-name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter board name"
              />
            </Field>

            <Field>
              <Label htmlFor="board-description">
                Description
              </Label>

              <Textarea
                id="board-description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe what this board is for..."
                rows={4}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={!name.trim()}
            >
              Create Board
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}