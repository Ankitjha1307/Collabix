export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  _id: string;
  name: string;
  description: string;
  boardId: string;
  createdBy: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardTasksData {
  tasks: Task[];
  page: number;
  totalPages: number;
  totalTasks: number;
}

export interface CreateTaskData {
  name: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignedTo?: string;
  dueDate?: string;
}