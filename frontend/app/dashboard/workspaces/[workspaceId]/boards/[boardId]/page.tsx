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
import TaskDetailsDialog from "@/components/board/TaskDetailsDialog";
import { LoadingSpinner } from "@/components/common/loading";
import NotFound from "@/app/not-found";

export default function BoardPage() {
    const { boardId, workspaceId } = useParams<{
      boardId: string;
      workspaceId: string;
    }>();
    const [board, setBoard] = useState<Board | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const selectedTask = tasks.find((task) => task._id === selectedTaskId) ?? null;

    const fetchBoardData = async () => {
          try {
            const [boardResponse, tasksResponse] = await Promise.all([
              getBoardById(boardId),
              getBoardTasks(boardId),
            ]);
            setBoard(boardResponse.data);
            setTasks(tasksResponse.tasks);
          } catch(error : any){
            setError(error.response?.data?.message ?? "Failed to load board!");
          } finally{
            setLoading(false);
          }
    };

    const handleBoardUpdated = (updatedBoard: Board) => {
      setBoard(updatedBoard);
  };

    const handleTaskCreated = (createdTask: Task) => {
      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);
    };

    const handleTaskUpdated = (updatedTask: Task) => {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === updatedTask._id
            ? updatedTask
            : task
        )
      );
    };

    const handleTaskDeleted = (taskId: string) => {
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== taskId)
      );
      setSelectedTaskId(null);
    };

    useEffect(() => {
        fetchBoardData();
      }, [boardId]);

  if (loading) return <LoadingSpinner text="Loading board..." />;

  if (error) return (<div className="mx-auto max-w-7xl rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">{error}</div>);
  
  if (!board) return <NotFound />;

  return (
    <div className="p-6">
      <BoardHeader
        board={board}
        workspaceId={workspaceId}
        onBoardUpdated={handleBoardUpdated}
        onTaskCreated={handleTaskCreated}
      />

      <Separator className="my-8" />

      <KanbanBoard 
      tasks={tasks}
      onTaskSelect={(task) => setSelectedTaskId(task._id)}
      />

      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          workspaceId={workspaceId}
          open={true}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedTaskId(null);
            }
          }}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </div>
  );
}