import BoardCard from "./BoardCard";
import EmptyBoards from "./EmptyBoards";
import type { Board } from "@/types/board";

interface Props {
  boards: Board[];
  workspaceId: string;
}

export default function BoardSection({
  boards,
  workspaceId
}: Props) {
  return (
    <>
      <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
        Boards
        <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
            {boards.length}
        </span>
      </h2>

      <div className="mt-6">
        {boards.length === 0 ? (
          <EmptyBoards />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {boards.map((board) => (
              <BoardCard
                key={board._id}
                id={board._id}
                workspaceId={workspaceId}
                name={board.name}
                updatedAt={board.updatedAt}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}