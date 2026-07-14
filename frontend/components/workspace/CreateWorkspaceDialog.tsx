"use client";

import { useState } from "react";
import { createWorkspace } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
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
import { Field, FieldGroup } from "@/components/ui/field";

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkspaceCreated: (workspace: Workspace) => void;
}

export default function CreateWorkspaceDialog({
  open,
  onOpenChange,
  onWorkspaceCreated,
}: CreateBoardDialogProps) {
  const [name, setName] = useState("");

  const handleCreateWorkspace = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (!name.trim()) return;

      const response = await createWorkspace(name);

      onWorkspaceCreated(response.data);

      setName("");

      onOpenChange(false);
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form
          onSubmit={handleCreateWorkspace}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>

            <DialogDescription>
              Create a workspace to manage your boards and tasks.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="workspace-name">
                Workspace Name
              </Label>

              <Input
                id="workspace-name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter workspace name"
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
              Create Workspace
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}