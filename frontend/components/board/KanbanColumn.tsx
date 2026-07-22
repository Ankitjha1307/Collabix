import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  status: string;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
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
    dotClass: "bg-primary",
  },
  DONE: {
    label: "Done",
    dotClass: "bg-accent",
  },
};

export default function KanbanColumn({ status, tasks, onTaskSelect }: KanbanColumnProps) {
  const config = statusConfig[status];

  return (
    <div className="flex min-h-[500px] flex-col rounded-3xl border bg-card shadow-sm p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${config.dotClass}`}
          />

          <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight">
            {config.label}
          </h2>
        </div>

        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            {tasks.length}
        </span>
      </div>

      {tasks.length > 0 ? (<div className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onTaskSelect={onTaskSelect}/>
        ))}
      </div>) :
        (<div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-2xl border border-dashed p-8 text-center">
            <p className="text-sm font-medium">
              Nothing here yet
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Create a task to get started.
            </p>
          </div>
        </div>)}
    </div>
  );
}