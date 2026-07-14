"use client";

import { useEffect, useState } from "react";
import type { Workspace } from "@/types/workspace";
import WorkspaceSection from "@/components/workspace/WorkspaceSection";
import { getUserWorkspaces } from "@/services/workspace.service";
import { Separator } from "@/components/ui/separator";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    const workspacesData = await getUserWorkspaces();
    setWorkspaces(workspacesData.data);
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
    <div className="space-y-8">

    <div>
      <h1 className="text-3xl font-bold">
        Workspaces
      </h1>

      <p className="mt-2 text-muted-foreground">
        Manage your team workspaces.
      </p>
    </div>

    <Separator />

    <WorkspaceSection
      workspaces={workspaces}
      onWorkspaceCreated={
        handleWorkspaceCreated
      }
    />

</div>
  );
}