"use client";

import BoardHeader from "@/components/board/BoardHeader";
import KanbanBoard from "@/components/board/KanbanBoard";
import { getBoardById } from "@/services/board.service";
import type { Board } from "@/types/board";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardPage() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<Board | null>(null);

    const fetchBoard = async () => {
          try {
            const response =
              await getBoardById(boardId);
              console.log("Board:", response.data);
    
              setBoard(response.data);
          } catch (error) {
            console.error(error);
          }
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
      />

      <Separator className="my-8" />

      <KanbanBoard />
    </div>
  );
}