"use client";

import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
import type { Board } from "@/types/board";
import { getBoardsByWorkspace } from "@/services/board.service";
import BoardSection from "@/components/board/BoardSection";
import WorkspaceMembers from "@/components/workspace/WorkspaceMembers";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";


export default function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState<"OWNER" | "ADMIN" | "MEMBER">("MEMBER");
  const [boards, setBoards] = useState<Board[]>([]);

  const fetchWorkspace = async () => {
      try{
        const response = await getWorkspaceById(workspaceId);

        setWorkspace(response.data.workspace);
        setRole(response.data.role);
      }catch(error){
        console.error(error);
      }
  };

    const fetchBoards = async () => {
      try {
        const response =
          await getBoardsByWorkspace(workspaceId);
          console.log("Boards:", response.data);

          setBoards(response.data.boards);
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    const fetchPageData = async () => {
      await Promise.all([
        fetchWorkspace(),
        fetchBoards(),
      ]);
    };

    fetchPageData();
  }, [workspaceId]);

  const handleWorkspaceUpdated = (
    updatedWorkspace: Workspace
  ) => {
    setWorkspace(updatedWorkspace);
  };

  const handleBoardCreated = (
    newBoard: Board
  ) => {
    setBoards((current) => [newBoard, ...current]);
  };
  

  if (!workspace) {
    return <div>Loading...</div>;
  }

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