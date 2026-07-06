import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BoardHeaderProps  {
  name: string;
  description?: string;
}

export default function BoardHeader({
    name,
    description
} : BoardHeaderProps ) {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <Button
                variant="ghost"
                asChild
                className="w-fit">
                    <Link href="/dashboard/workspaces">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Workspaces
                    </Link>
            </Button>
            
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Task
            </Button>
        </div>
      

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}