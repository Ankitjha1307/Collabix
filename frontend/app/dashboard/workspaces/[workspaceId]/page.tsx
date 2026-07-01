"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";

export default function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchWorkspace = async () => {
      const response = await getWorkspaceById(workspaceId);

      setWorkspace(response.data.workspace);
      setRole(response.data.role);
    };

    fetchWorkspace();
  }, [workspaceId]);

  if (!workspace) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Workspace: {workspace.name}
      </h1>
      <p className="text-lg text-gray-600">
        Role: {role}
      </p>
    </div>
  );
}