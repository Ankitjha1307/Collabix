"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inviteUserToWorkspace } from "@/services/workspace.service";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteMemberDialogProps {
  workspaceId: string;
  onMemberInvited: () => void;
}

export default function InviteMemberDialog({
  workspaceId,
  onMemberInvited,
}: InviteMemberDialogProps) {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"ADMIN" | "MEMBER">("MEMBER");
  const [isInviting, setIsInviting] = useState(false);
  const [error, setError] = useState("");

  const handleInvite = async () => {
  if (!username.trim()) {
    setError("Username is required.");
    return;
  }

  try {
    setIsInviting(true);
    setError("");

    await inviteUserToWorkspace(workspaceId, username.trim(), role);
    onMemberInvited();

    resetForm();
    setOpen(false);
  } catch (error : any) {
    console.log(error.response?.data?.message);
    setError(error.response?.data?.message ?? "Failed to invite member.");
  } finally {
    setIsInviting(false);
  }
};

  const resetForm = () => {
    setUsername("");
    setRole("MEMBER");
    setError("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetForm();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus className="mr-2 size-4" />
          Invite
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Invite Member
          </DialogTitle>

          <DialogDescription>
            Invite a user to this workspace.
          </DialogDescription>
        </DialogHeader>

        <fieldset
          disabled={isInviting}
          className="space-y-5 py-3"
        >
          <div className="space-y-2">
            <Label>Username</Label>

            <Input
              placeholder="Enter username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>

            <Select
              value={role}
              onValueChange={(value) =>
                setRole(
                  value as "ADMIN" | "MEMBER"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="MEMBER">Member</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </fieldset>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleInvite}
            disabled={
              isInviting ||
              !username.trim()
            }
          >
            {isInviting
              ? "Inviting..."
              : "Invite Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}