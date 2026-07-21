import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onTaskSelect: (task: Task) => void;
}

const priorityConfig = {
  LOW: {
    label: "Low",
    variant: "secondary",
  },
  MEDIUM: {
    label: "Medium",
    variant: "default",
  },
  HIGH: {
    label: "High",
    variant: "destructive",
  },
} as const;

export default function TaskCard({
  task,
  onTaskSelect,
}: Props) {
  const priority =
    priorityConfig[task.priority];

  return (
    <Card
      onClick={() => onTaskSelect(task)}
      className="
        cursor-pointer
        rounded-2xl
        py-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary
        hover:shadow-xl
      "
    >
      <CardHeader className="space-y-4 px-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="flex-1 text-[15px] font-semibold leading-6 line-clamp-2">
            {task.name}
          </CardTitle>

          <Badge
            variant={priority.variant}
            className="shrink-0"
          >
            {priority.label}
          </Badge>
        </div>

        {task.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {task.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="px-5 pt-2">
        <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span className="truncate">
              {task.assignedTo.username}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />

            <span>
              {task.dueDate? new Date(task.dueDate).toLocaleDateString(undefined,
                {
                  month: "short",
                  day: "numeric",
                }
              )
              : "No due date"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}