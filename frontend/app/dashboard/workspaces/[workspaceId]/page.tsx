"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
import type { Board } from "@/types/board";
import { getBoardsByWorkspace } from "@/services/board.service";
import BoardSection from "@/components/board/BoardSection";
import WorkspaceMembers from "@/components/workspace/WorkspaceMembers";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { LoadingSpinner } from "@/components/common/loading";
import NotFound from "@/app/not-found";


export default function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState<"OWNER" | "ADMIN" | "MEMBER">("MEMBER");
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspace = async () => {
    const response = await getWorkspaceById(workspaceId);
    setWorkspace(response.data.workspace);
    setRole(response.data.role);
  };

  const fetchBoards = async () => {
    setLoading(true);
    const response = await getBoardsByWorkspace(workspaceId);
    setBoards(response.data.boards);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchWorkspace(),
          fetchBoards(),
        ]);
      } catch(error : any){
        setError(error.response?.data?.message ?? "Failed to load workspace!");
      } finally{
        setLoading(false);
      }
    };

    fetchPageData();
  }, [workspaceId]);

  const handleWorkspaceUpdated = (updatedWorkspace: Workspace) => {
    setWorkspace(updatedWorkspace);
  };

  const handleBoardCreated = (newBoard: Board) => {
    setBoards((current) => [newBoard, ...current]);
  };
  

  if (loading) return <LoadingSpinner text="Loading workspace..." />;

  if (error) return (<div className="mx-auto max-w-7xl rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</div>);
  
  if (!workspace) return <NotFound />;

  return (
    <div className="space-y-16">
      <WorkspaceHeader
        workspace={workspace}
        onWorkspaceUpdated={handleWorkspaceUpdated}
        onBoardCreated={handleBoardCreated}
      />

      <WorkspaceMembers
        workspaceId={workspace._id}
        currentUserRole={role}
      />

      <BoardSection
        boards={boards}
        workspaceId={workspace._id}
      />
    </div>
  );
}