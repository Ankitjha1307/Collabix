import { User } from "./user";

export interface Workspace {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMember {
  userId: User;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export type WorkspaceAssignee = User;

export interface WorkspaceMembersData {
  members: WorkspaceMember[];
  page: number;
  totalPages: number;
  totalMembers: number;
}