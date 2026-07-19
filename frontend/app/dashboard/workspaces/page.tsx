"use client";

import { useEffect, useState } from "react";
import type { Workspace } from "@/types/workspace";
import WorkspaceSection from "@/components/workspace/WorkspaceSection";
import { getUserWorkspaces } from "@/services/workspace.service";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const workspacesData = await getUserWorkspaces();
    setWorkspaces(workspacesData);
  };

  const handleWorkspaceCreated = (
    workspace: Workspace
  ) => {
    setWorkspaces((current) => [
      workspace,
      ...current,
    ]);
  };

  return (
    <div className="space-y-16">

    <div>
      <h1 className="text-3xl font-bold">
        Workspaces
      </h1>

      <p className="mt-2 text-muted-foreground">
        Create, organize and manage collaboration spaces for every project.
      </p>
    </div>

    <WorkspaceSection
      workspaces={workspaces}
      onWorkspaceCreated={
        handleWorkspaceCreated
      }
    />

</div>
  );
}