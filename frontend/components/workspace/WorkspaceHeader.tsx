import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  name: string;
  role: string;
}

export default function WorkspaceHeader({
  name,
  role,
}: Props) {
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        asChild
        className="w-fit"
      >
        <Link href="/dashboard/workspaces">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Workspaces
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            {name}
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage boards and collaborate with your team.
          </p>
        </div>

        <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          {role}
        </Badge>
      </div>

      
    </div>
  );
}