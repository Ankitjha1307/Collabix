import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Props {
  id: string;
  workspaceId: string;
  name: string;
  updatedAt: string;
}

export default function BoardCard({
  id,
  workspaceId,
  name,
  updatedAt,
}: Props) {
  return (
    <Link
      href={`/dashboard/workspaces/${workspaceId}/boards/${id}`}
    >
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>

          <CardDescription>
            Click to manage tasks
            <p className="text-xs text-muted-foreground mt-4">
              Updated {new Date(updatedAt).toLocaleDateString()}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}