export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  _id: string;
  name: string;
  description: string;
  boardId: string;
  createdBy: {
    _id: string;
    username: string;
  };
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: {
    _id: string;
    username: string;
  };
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

export interface UpdateTaskData {
  name?: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string | null;
}