"use client";

import { Separator } from "@/components/ui/separator";

import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";

import EmptyBoards from "@/components/board/EmptyBoards";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWorkspaceById } from "@/services/workspace.service";
import type { Workspace } from "@/types/workspace";
import { Button } from "@/components/ui/button";
import type { Board } from "@/types/board";
import { getBoardsByWorkspace } from "@/services/board.service";
import BoardCard from "@/components/board/BoardCard";
import CreateBoardDialog from "@/components/board/CreateBoardDialog";


export default function WorkspacePage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [open, setOpen] = useState(false);

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

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Boards
        </h2>

        <Button onClick={() => setOpen(true)}>
          New Board
        </Button>
      </div>

      <div className="mt-6">
        {boards.length === 0 ? (
          <EmptyBoards
            onCreate={() => setOpen(true)}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {boards.map((board) => (
              <BoardCard
                key={board._id}
                id={board._id}
                workspaceId={workspaceId}
                name={board.name}
              />
            ))}
          </div>
        )}
      </div>

      <CreateBoardDialog
        open={open}
        onOpenChange={setOpen}
        workspaceId={workspaceId}
        onBoardCreated={(board) =>
          setBoards((prev) => [...prev, board])
        }
      />
    </div>
  );
}