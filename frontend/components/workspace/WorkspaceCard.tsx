import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <Link
      href={`/dashboard/workspaces/${workspaceId}`}
    >
      <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>

          <CardDescription>
            Click to manage boards
            <p className="text-xs text-muted-foreground mt-4">
              Updated {new Date(updatedAt).toLocaleDateString()}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}