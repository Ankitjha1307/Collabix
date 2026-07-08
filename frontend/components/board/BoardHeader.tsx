import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateTaskDialog from "./CreateTaskDialog";
import type { Task } from "@/types/task";

interface BoardHeaderProps  {
  name: string;
  description?: string;
  boardId: string;
  workspaceId: string;
  onTaskCreated: (task: Task) => void;
}

export default function BoardHeader({
    name,
    description,
    boardId,
    workspaceId,
    onTaskCreated
} : BoardHeaderProps ) {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              asChild
              className="w-fit">
                  <Link href={`/dashboard/workspaces/${workspaceId}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Workspace
                  </Link>
            </Button>
            
            <CreateTaskDialog
              boardId={boardId}
              workspaceId={workspaceId}
              onTaskCreated={onTaskCreated}
            />
        </div>
      

      <div>
        <h1 className="text-4xl font-bold">{name}</h1>

        {description && (
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}