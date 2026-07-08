"use client";

import BoardHeader from "@/components/board/BoardHeader";
import KanbanBoard from "@/components/board/KanbanBoard";
import { Separator } from "@/components/ui/separator";
import { getBoardById } from "@/services/board.service";
import { getBoardTasks } from "@/services/task.service";
import type { Board } from "@/types/board";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Task } from "@/types/task";

export default function BoardPage() {
    const { boardId, workspaceId } = useParams<{
      boardId: string;
      workspaceId: string;
    }>();
    const [board, setBoard] = useState<Board | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchBoard = async () => {
          try {
            const response = await getBoardById(boardId);
            const tasksData = await getBoardTasks(boardId);
    
              setBoard(response.data);
              setTasks(tasksData.tasks);
          } catch (error) {
            console.error(error);
          }
    };

    const handleTaskCreated = (createdTask: Task) => {
      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);
    };

    useEffect(() => {
        fetchBoard();
      }, [boardId]);

  if (!board) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-6">
      <BoardHeader
        name={board.name}
        description = {board.description}
        boardId={boardId}
        workspaceId={workspaceId}
        onTaskCreated={handleTaskCreated}
      />

      <Separator className="my-8" />

      <KanbanBoard tasks={tasks} />
    </div>
  );
}