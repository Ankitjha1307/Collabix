"use client";

import { useEffect, useState } from "react";
import type { Workspace } from "@/types/workspace";
import WorkspaceSection from "@/components/workspace/WorkspaceSection";
import { getUserWorkspaces } from "@/services/workspace.service";
import { LoadingSpinner } from "@/components/common/loading";

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const workspacesData = await getUserWorkspaces();
      setWorkspaces(workspacesData);
    } catch (error : any) {
      setError(error.response?.data?.message ?? "Failed to load workspaces!");
    }finally{
      setLoading(false);
    }
  };

  const handleWorkspaceCreated = (
    workspace: Workspace
  ) => {
    setWorkspaces((current) => [
      workspace,
      ...current,
    ]);
  };

  if(loading) return <LoadingSpinner text="Loading workspaces..." />;

  return (
    <>
      {error && (<p className="text-sm text-destructive">{error}</p>)}

      <div className="space-y-16">
        <div>
          <h1 className="text-3xl font-bold">Workspaces</h1>
          <p className="mt-2 text-muted-foreground">Create, organize and manage collaboration spaces for every project.</p>
        </div>

        <WorkspaceSection
          workspaces={workspaces}
          onWorkspaceCreated={handleWorkspaceCreated}
        />
      </div>
    </>
  );
}