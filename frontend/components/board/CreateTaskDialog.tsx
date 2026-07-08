"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { createTask } from "@/services/task.service";
import type {
  CreateTaskData,
  Task,
  TaskPriority,
  TaskStatus,
} from "@/types/task";
import type { WorkspaceAssignee } from "@/types/workspace";
import { getWorkspaceAssignees } from "@/services/workspace.service";

interface CreateTaskDialogProps {
  boardId: string;
  workspaceId: string;
  onTaskCreated: (task: Task) => void;
}

export default function CreateTaskDialog({
  boardId,
  workspaceId,
  onTaskCreated,
}: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [assignees, setAssignees] = useState<WorkspaceAssignee[]>([]);
  const [assignedTo, setAssignedTo] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("TODO");
    setPriority("MEDIUM");
    setAssignedTo("");
    setDueDate("");
    setError("");
  };

  const handleCreateTask = async () => {
    if (!name.trim()) {
      setError("Task name is required");
      return;
    }

    try {
      setIsCreating(true);
      setError("");

      const taskData: CreateTaskData = {
        name: name.trim(),
        description: description.trim(),
        status,
        priority,
        assignedTo: assignedTo || undefined,
        dueDate: dueDate || undefined,
      };

      const createdTask = await createTask(boardId, taskData);

      onTaskCreated(createdTask);

      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
  if (!open) return;

  const fetchAssignees = async () => {
    try {
      const assigneeData =
        await getWorkspaceAssignees(workspaceId);

      setAssignees(assigneeData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchAssignees();
}, [open, workspaceId]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={(event) => {
          event.preventDefault();
          handleCreateTask();
        }}>
        
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>
              Add a task to this board and choose where it should start.
            </DialogDescription>
          </DialogHeader>

          <fieldset className="space-y-5 py-2" disabled={isCreating}>
            <div className="space-y-2">
              <Label htmlFor="task-name">Task name</Label>
              <Input
                id="task-name"
                placeholder="Enter the task name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-description">
                Description
              </Label>
              <Textarea
                id="task-description"
                placeholder="Enter the task description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={status}
                  onValueChange={(value) => setStatus(value as TaskStatus)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">
                      In Progress
                    </SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>

                <Select
                  value={priority}
                  onValueChange={(value) => setPriority(value as TaskPriority)}
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
            </div>

            <div className="space-y-2">
              <Label>Assignee</Label>

              <Select
                value={assignedTo}
                onValueChange={setAssignedTo}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign to yourself" />
                </SelectTrigger>

                <SelectContent>
                  {assignees.map((assignee) => (
                    <SelectItem
                      key={assignee.userId._id}
                      value={assignee.userId._id}
                    >
                      {assignee.userId.username} · {assignee.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="task-due-date">Due date</Label>
              <Input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive"> {error} </p>
            )}
          </fieldset>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isCreating || !name.trim()}
            >
              {isCreating ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}