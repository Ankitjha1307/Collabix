"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createWorkspace, getUserWorkspaces } from "@/services/workspace.service";
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
import type { Workspace } from "@/types/workspace";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    

    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
      const workspacesData = await getUserWorkspaces();
      console.log("WORKSPACES:", workspacesData);
      setWorkspaces(workspacesData.data);
    };

    const handleCreateWorkspace = async ( e: React.FormEvent) => {
      e.preventDefault();
      console.log("FORM SUBMITTED");
      try {
        if (!name.trim()) return;
        console.log("before api");

        const createdWorkspace = await createWorkspace(name);

        setWorkspaces((prev) => [
          ...prev,
          createdWorkspace.data,
        ]);

        setName("");
        setOpen(false);
      } catch (error) {
        console.error("Error creating workspace:", error);
      }
    };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Workspaces
          </h1>

          <p className="text-muted-foreground">
            Manage your team workspaces.
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>
          New Workspace
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((workspace) => (
          <Link
            key={workspace._id}
            href={`/dashboard/workspaces/${workspace._id}`}
          >
            <div className="rounded-xl border p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
              <h2 className="text-lg font-semibold">
                {workspace.name}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Workspace
              </p>

              <div className="mt-4 text-xs text-muted-foreground">
                Created{" "}
                {new Date(workspace.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <form onSubmit={handleCreateWorkspace}>
                <DialogHeader>
                  <DialogTitle>
                    Create Workspace
                  </DialogTitle>

                  <DialogDescription>
                    Create a new workspace for your team.
                  </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                  <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Workspace name"
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
                    disabled={!name.trim()}>
                      Create
                  </Button>
                </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
}