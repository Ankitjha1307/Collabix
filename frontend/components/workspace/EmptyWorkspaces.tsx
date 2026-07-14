import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  onCreate: () => void;
}

export default function EmptyWorkspaces({
  onCreate,
}: Props) {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 py-16">
      <LayoutGrid className="h-12 w-12 text-muted-foreground" />

      <div className="text-center">
        <h3 className="text-lg font-semibold">
          No workspaces yet
        </h3>

        <p className="text-muted-foreground">
          Create your first workspace to start organizing boards.
        </p>
      </div>

      <Button onClick={onCreate}>
        Create Workspace
      </Button>
    </Card>
  );
}