export interface Workspace {
  _id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspaceMemberUser {
  _id: string;
  username: string;
  email: string;
}

export interface WorkspaceMember {
  userId: WorkspaceMemberUser;
  role: "OWNER" | "ADMIN" | "MEMBER";
}

export type WorkspaceAssignee = WorkspaceMember;

export interface WorkspaceMembersData {
  members: WorkspaceMember[];
  page: number;
  totalPages: number;
  totalMembers: number;
}