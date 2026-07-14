"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Board } from "@/types/board";
import {updateBoard, deleteBoard} from "@/services/board.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Settings, Trash2 } from "lucide-react";

interface BoardSettingsDialogProps {
  board: Board;
  workspaceId: string;
  onBoardUpdated: (board: Board) => void;
}

export default function BoardSettingsDialog({
  board,
  workspaceId,
  onBoardUpdated,
}: BoardSettingsDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description ?? "");

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName(board.name);
    setDescription(board.description ?? "");
    setError("");
    setIsSaving(false);
    setIsDeleting(false);
  };

  const handleUpdateBoard = async () => {
    if (!name.trim()) {
      setError("Board name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const updatedBoard = await updateBoard(
        board._id,
        {
          name: name.trim(),
          description: description.trim(),
        }
      );

      onBoardUpdated(updatedBoard);

      setOpen(false);
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
          "Failed to update board."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      setIsDeleting(true);

      await deleteBoard(board._id);

      router.push(`/dashboard/workspaces/${workspaceId}`);
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
          "Failed to delete board."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          resetForm();
        }

        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Settings className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Board Settings
          </DialogTitle>

          <DialogDescription>
            Manage this board.
          </DialogDescription>
        </DialogHeader>

        <fieldset
          disabled={isSaving}
          className="space-y-5 py-5"
        >
          <div className="space-y-2">
            <Label>Board Name</Label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </fieldset>

        <DialogFooter>
          <Button
            onClick={handleUpdateBoard}
            disabled={
              isSaving || !name.trim()
            }
          >
            {isSaving
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </DialogFooter>

        <div className="mt-6 rounded-lg border border-destructive/30 p-4">
          <h3 className="font-semibold text-destructive">
            Danger Zone
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Deleting this board permanently removes:
          </p>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Board</li>
            <li>Tasks</li>
            <li>Comments</li>
          </ul>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="mt-5"
              >
                <Trash2 className="mr-2 size-4" />
                Delete Board
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Delete Board?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  Everything inside this board
                  will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteBoard}
                  disabled={isDeleting}
                >
                  {isDeleting
                    ? "Deleting..."
                    : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}