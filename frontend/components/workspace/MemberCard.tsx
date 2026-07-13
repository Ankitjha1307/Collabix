"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { WorkspaceMember } from "@/types/workspace";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { updateMemberRole } from "@/services/workspace.service";
import { removeMember } from "@/services/workspace.service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface MemberCardProps {
  member: WorkspaceMember;
  workspaceId: string;
  currentUserRole: "OWNER" | "ADMIN" | "MEMBER";
  onMembersUpdated: () => void;
}

export default function MemberCard({
  member,
  workspaceId,
  currentUserRole,
  onMembersUpdated,
}: MemberCardProps) {
  const initials = member.userId.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

  const [role, setRole] = useState(member.role);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const canManageRole = currentUserRole === "OWNER" && member.role !== "OWNER";

  const handleRoleChange = async (newRole: "ADMIN" | "MEMBER") => {
    try {
      await updateMemberRole(workspaceId, member.userId.username, newRole);

      setRole(newRole);

      onMembersUpdated();
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
        "Failed to update role."
      );
    }
  };

  const handleRemoveMember = async () => {
    setIsDeleting(true);
    try {
      await removeMember(workspaceId, member.userId._id);
      onMembersUpdated();
    } catch (error: any) {
      console.error(error);

      setError(
        error.response?.data?.message ??
        "Failed to remove member."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{member.userId.name}</p>

            <p className="text-sm text-muted-foreground">@{member.userId.username}</p>

            <p className="text-sm text-muted-foreground">{member.userId.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {canManageRole ? (
            <>
              <Select
                value={role}
                onValueChange={(value) => handleRoleChange(value as "ADMIN" | "MEMBER")}
                disabled={isDeleting}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ADMIN">
                    ADMIN
                  </SelectItem>

                  <SelectItem value="MEMBER">
                    MEMBER
                  </SelectItem>
                </SelectContent>
              </Select>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Remove this member?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      This action cannot be undone. The member will be permanently removed from the workspace.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={handleRemoveMember}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Removing..." : "Remove"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {error && (
                <p className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </>
              
            ) : (
              <Badge>{role}</Badge>
            )}
        </div>
      </CardContent>
    </Card>
  );
}