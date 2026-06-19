"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserWorkspaces } from "@/services/workspace.service";

export default function WorkspacesPage() {
  interface Workspace {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const [workspaces, setWorkspaces] =
  useState<Workspace[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const workspacesData = await getUserWorkspaces();
      console.log("WORKSPACES:", workspacesData);
      setWorkspaces(workspacesData.data);
    };

    fetchWorkspaces();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Workspaces
      </h1>

      <p className="text-muted-foreground m-2">
        Manage your team workspaces.
      </p>

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
    </div>
  );
}