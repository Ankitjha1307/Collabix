"use client";

import { useEffect, useState } from "react";
import { getWorkspaceMembers } from "@/services/workspace.service";
import MemberCard from "./MemberCard";
import type { WorkspaceMember } from "@/types/workspace";
import { Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import InviteMemberDialog from "./InviteMemberDialog";

interface WorkspaceMembersProps {
    workspaceId: string;
    currentUserRole: "OWNER" | "ADMIN" | "MEMBER";
}

export default function WorkspaceMembers({ workspaceId, currentUserRole }: WorkspaceMembersProps) {
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {
    try {
        setLoading(true);

        const data = await getWorkspaceMembers(workspaceId);
        setMembers(data.members);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
    fetchMembers();
    }, [workspaceId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="members">
                <AccordionTrigger>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Users className="size-4" />
                            <span>Workspace Members ({members.length})</span>
                        </div>

                        <div onClick={(event) => event.stopPropagation()}>
                            <InviteMemberDialog
                                workspaceId={workspaceId}
                                onMemberInvited={fetchMembers}
                            />
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent>
                    <div className="flex flex-wrap gap-3">
                        {members.map((member) => (
                        <MemberCard
                            key={member.userId._id}
                            member={member}
                            workspaceId={workspaceId}
                            currentUserRole={currentUserRole}
                            onMembersUpdated={fetchMembers}
                        />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}