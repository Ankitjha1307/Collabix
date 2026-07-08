"use client";

import { useState } from "react";
import type { Task, TaskPriority, UpdateTaskData } from "@/types/task";
import { updateTask } from "@/services/task.service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskDetailsDialogProps {
  task: Task;
  children: React.ReactNode;
  onTaskUpdated: (task: Task) => void;
}

export default function TaskDetailsDialog({
  task,
  children,
  onTaskUpdated,
}: TaskDetailsDialogProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);

  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : "");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleUpdateTask = async () => {
    if (!name.trim()) {
      setError("Task name is required");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const taskData: UpdateTaskData = {
        name: name.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
      };

      const updatedTask = await updateTask(task._id, taskData);

      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error(error);
      setError("Failed to update task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setName(task.name);
    setDescription(task.description);
    setPriority(task.priority);
    setDueDate(
      task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
    );
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
    if (isOpen) {
      resetForm();
    }

    setOpen(isOpen);
  }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateTask();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Update this task&apos;s details.
            </DialogDescription>
          </DialogHeader>

          <fieldset
            disabled={isSaving}
            className="space-y-5 py-5"
          >
            <div className="space-y-2">
              <Label htmlFor={`task-name-${task._id}`}>
                Task name
              </Label>

              <Input
                id={`task-name-${task._id}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`task-description-${task._id}`}>
                Description
              </Label>

              <Textarea
                id={`task-description-${task._id}`}
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>

              <Select
                value={priority}
                onValueChange={(value) =>
                  setPriority(value as TaskPriority)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`task-due-date-${task._id}`}>
                Due date
              </Label>

              <Input
                id={`task-due-date-${task._id}`}
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
          </fieldset>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSaving || !name.trim()}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}