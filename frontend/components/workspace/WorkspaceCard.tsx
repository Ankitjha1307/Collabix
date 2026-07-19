import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Folder, ArrowRight } from "lucide-react";

interface Props {
  workspaceId: string;
  name: string;
  updatedAt: string;
}

export default function WorkspaceCard({
  workspaceId,
  name,
  updatedAt,
}: Props) {
  return (
    <Link href={`/dashboard/workspaces/${workspaceId}`}>
      <Card className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Folder className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
              {name}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Updated{" "}
              {new Date(updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center text-sm font-medium text-primary">
          Open Workspace
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    </Link>
  );
}