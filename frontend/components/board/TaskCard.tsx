import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";
import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onTaskSelect: (task: Task) => void;
}

export default function TaskCard({ task, onTaskSelect }: Props) {
  return (
    <Card
      onClick={() => onTaskSelect(task)}
      className="cursor-pointer gap-3 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-lg">
      <CardHeader className="px-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm leading-snug">
            {task.name}
          </CardTitle>

          <Badge
            variant={
              task.priority === "HIGH"
                ? "destructive"
                : task.priority === "MEDIUM"
                  ? "default"
                  : "secondary"
            }
            className="shrink-0 text-[10px]"
          >
            {task.priority}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        {task.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5" />
          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}