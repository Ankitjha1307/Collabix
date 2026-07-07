import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

const statusConfig: Record<
  string,
  {
    label: string;
    dotClass: string;
  }
> = {
  TODO: {
    label: "To Do",
    dotClass: "bg-slate-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dotClass: "bg-purple-500",
  },
  DONE: {
    label: "Done",
    dotClass: "bg-amber-300",
  },
};

export default function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const config = statusConfig[status];

  return (
    <div className="flex min-h-[500px] flex-col rounded-xl border bg-muted/30 p-3">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`size-2.5 rounded-full ${config.dotClass}`}
          />

          <h2 className="text-sm font-semibold">
            {config.label}
          </h2>
        </div>

        <Badge variant="secondary">{tasks.length}</Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}