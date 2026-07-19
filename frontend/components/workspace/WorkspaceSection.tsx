"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkspaceCard from "./WorkspaceCard";
import EmptyWorkspaces from "./EmptyWorkspaces";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import type { Workspace } from "@/types/workspace";

interface Props {
  workspaces: Workspace[];
  onWorkspaceCreated: (workspace: Workspace) => void;
}

export default function WorkspaceSection({
  workspaces,
  onWorkspaceCreated
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          Your Workspaces

          <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
            {workspaces.length}
          </span>
        </h2> 

        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Workspace
        </Button>
      </div>

      <div className="mt-8">
        {workspaces.length === 0 ? (
          <EmptyWorkspaces
            onCreate={() => setOpen(true)}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace._id}
                workspaceId={workspace._id}
                name={workspace.name}
                updatedAt={workspace.updatedAt}
              />
            ))}
          </div>
        )}
      </div>

      <CreateWorkspaceDialog
        open={open}
        onOpenChange={setOpen}
        onWorkspaceCreated={onWorkspaceCreated}
      />
    </>
  );
}