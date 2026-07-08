import { Task, TaskStatus  } from "@/types/task";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
}

const columns: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

export default function KanbanBoard({ tasks, onTaskUpdated }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((column) => (
        <KanbanColumn
          key={column}
          status={column}
          tasks={tasks.filter((task) => task.status === column)}
          onTaskUpdated={onTaskUpdated}
        />
      ))}
    </div>
  );
}