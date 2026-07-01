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
}

export default function BoardCard({
  id,
  workspaceId,
  name,
}: Props) {
  return (
    <Link
      href={`/dashboard/workspaces/${workspaceId}/boards/${id}`}
    >
      <Card className="transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer">
        <CardHeader>
          <CardTitle>{name}</CardTitle>

          <CardDescription>
            Board
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}