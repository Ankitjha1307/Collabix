"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { Workspace } from "@/types/workspace";
import {updateWorkspace, deleteWorkspace} from "@/services/workspace.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface WorkspaceSettingsDialogProps {
  workspace: Workspace;
  onWorkspaceUpdated: (workspace: Workspace) => void;
}

export default function WorkspaceSettingsDialog({
  workspace,
  onWorkspaceUpdated,
}: WorkspaceSettingsDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(workspace.name);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName(workspace.name);
    setError("");
    setIsSaving(false);
    setIsDeleting(false);
  };

  const handleUpdateWorkspace = async () => {
    if (!name.trim()) {
      setError("Workspace name is required.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const updatedWorkspace = await updateWorkspace(
        workspace._id,
        {
          name: name.trim(),
        }
      );
      onWorkspaceUpdated(updatedWorkspace);

      setOpen(false);
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
          "Failed to update workspace."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteWorkspace = async () => {
    try {
      setIsDeleting(true);

      await deleteWorkspace(workspace._id);

      router.push("/dashboard/workspaces");
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
          "Failed to delete workspace."
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
          <DialogTitle>Workspace Settings</DialogTitle>
          <DialogDescription>Manage this workspace.</DialogDescription>
        </DialogHeader>

        <fieldset
          disabled={isSaving}
          className="space-y-5 py-5"
        >
          <div className="space-y-2">
            <Label>Workspace Name</Label>

            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
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
            onClick={handleUpdateWorkspace}
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
          <h3 className="font-semibold text-destructive">Danger Zone</h3>

          <p className="mt-2 text-sm text-muted-foreground">Deleting this workspace permanently removes:</p>

          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Workspace</li>
            <li>Members</li>
            <li>Boards</li>
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
                Delete Workspace
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Workspace?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                  Everything inside this workspace
                  will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteWorkspace}
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