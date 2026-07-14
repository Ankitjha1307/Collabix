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
      <h2 className="text-2xl font-semibold">
        My Boards
      </h2>

      <div className="mt-6">
        {boards.length === 0 ? (
          <EmptyBoards />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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