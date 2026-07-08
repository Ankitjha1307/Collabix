import type { Task } from "@/types/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface TaskDetailsDialogProps {
  task: Task;
  children: React.ReactNode;
}

export default function TaskDetailsDialog({
  task,
  children,
}: TaskDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.name}</DialogTitle>
          {task.description && (
            <DialogDescription>
              {task.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p>
            Due date:{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "Not set"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}