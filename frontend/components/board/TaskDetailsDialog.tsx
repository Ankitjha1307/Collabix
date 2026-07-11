"use client";

import { useState, useEffect } from "react";
import type { Task, TaskPriority, TaskStatus, UpdateTaskData } from "@/types/task";
import { assignTask, updateTask, updateTaskStatus } from "@/services/task.service";
import { getWorkspaceAssignees } from "@/services/workspace.service";
import type { WorkspaceAssignee } from "@/types/workspace";
import { deleteTask } from "@/services/task.service";
import {getTaskComments,} from "@/services/comment.service";
import type { Comment } from "@/types/comment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Separator } from "../ui/separator";

interface TaskDetailsDialogProps {
  task: Task;
  workspaceId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function TaskDetailsDialog({
  task,
  workspaceId,
  open,
  onOpenChange,
  onTaskUpdated,
  onTaskDeleted,
}: TaskDetailsDialogProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<TaskPriority>(task.priority);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split("T")[0] : "");
  const [assignees, setAssignees] = useState<WorkspaceAssignee[]>([]);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo); 
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
      setName(updatedTask.name);
      setDescription(updatedTask.description);
      setPriority(updatedTask.priority);
      setDueDate(
        updatedTask.dueDate
          ? updatedTask.dueDate.split("T")[0]
          : ""
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (
    newStatus: TaskStatus) => {
    try {
      setError("");
      const updatedTask = await updateTaskStatus(task._id, newStatus);
      setStatus(updatedTask.status);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error(error);
      setError("Failed to update task status.");
    }
  };

  const handleAssigneeChange = async (
    newAssigneeId: string
  ) => {
    try {
      setError("");
      const updatedTask = await assignTask(task._id, newAssigneeId);
      setAssignedTo(updatedTask.assignedTo);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error(error);
      setError("Failed to reassign task.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true);
      setError("");
      await deleteTask(task._id);
      onTaskDeleted(task._id);
    } catch (error) {
      console.error(error);
      setError("Failed to delete task.");
    } finally {
      setIsDeleting(false);
    }
  };

  const fetchComments = async () => {
    try {
      setIsLoadingComments(true);

      const data = await getTaskComments(task._id);

      setComments(data.comments);
    } catch (error) {
      console.error(error);
      setError("Failed to load comments.");
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const data = await getWorkspaceAssignees(workspaceId);
        setAssignees(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workspace assignees.");
      }
    };

    fetchAssignees();
  }, [workspaceId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85dvh] sm:max-w-lg">
        <form
          className="flex max-h-[90dvh] flex-col"
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateTask();
          }}
        >
          <DialogHeader className="border-b px-6 py-4">
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Update this task&apos;s details.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <fieldset
              disabled={isSaving}
              className="space-y-5"
            >
              <div className="space-y-2">
                <Label htmlFor={`task-name-${task._id}`}>Task name</Label>
                <Input
                  id={`task-name-${task._id}`}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`task-description-${task._id}`}>Description</Label>
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
                <Label>Status</Label>

                <Select
                  value={status}
                  onValueChange={(value) =>
                    handleStatusChange(value as TaskStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Assignee</Label>

                <Select
                  value={assignedTo}
                  onValueChange={handleAssigneeChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>

                  <SelectContent>
                    {assignees.map((assignee) => (
                      <SelectItem
                        key={assignee.userId._id}
                        value={assignee.userId._id}
                      >
                        {assignee.userId.username} ({assignee.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`task-due-date-${task._id}`}>Due date</Label>
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

            <Separator className="my-6" />

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold">Comments</h3>
                <p className="text-sm text-muted-foreground">Discuss this task with your team.</p>
              </div>

              <Textarea placeholder="Write a comment..."/>

              <Button type="button">Add Comment</Button>

              <div className="space-y-3">
                {isLoadingComments ? (
                  <p className="text-sm text-muted-foreground">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No comments yet.</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="rounded-lg border p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">{comment.author.username}</span>
                          <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t px-6 py-4 sm:justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                >
                  Delete Task
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Delete this task?
                  </AlertDialogTitle>

                  <AlertDialogDescription>
                    This action cannot be undone. The task will be
                    permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>

                  <AlertDialogAction
                    onClick={handleDeleteTask}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

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