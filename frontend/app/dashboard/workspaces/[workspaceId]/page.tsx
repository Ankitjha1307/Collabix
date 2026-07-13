"use client";

import { Separator } from "@/components/ui/separator";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
import type { Board } from "@/types/board";
import { getBoardsByWorkspace } from "@/services/board.service";
import BoardSection from "@/components/board/BoardSection";
import WorkspaceMembers from "@/components/workspace/WorkspaceMembers";


export default function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState("");
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
    fetchWorkspace();
    fetchBoards();
  }, [workspaceId]);

  

  if (!workspace) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <WorkspaceHeader
        name={workspace.name}
        role={role}
      />

      <Separator className="my-8" />

      <WorkspaceMembers workspaceId={workspaceId} />

      <Separator className="my-8" />

      <BoardSection
        boards={boards}
        workspaceId={workspaceId}
        onBoardCreated={(board) =>
          setBoards((prev) => [...prev, board])
        }
      />
    </div>
  );
}