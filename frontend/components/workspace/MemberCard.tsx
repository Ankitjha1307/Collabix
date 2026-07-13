import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { WorkspaceMember } from "@/types/workspace";

interface MemberCardProps {
  member: WorkspaceMember;
}

export default function MemberCard({
  member,
}: MemberCardProps) {
  const initials = member.userId.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

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

        <Badge variant={member.role === "OWNER" ? "default" : member.role === "ADMIN" ? "secondary": "outline"}>{member.role}</Badge>
      </CardContent>
    </Card>
  );
}