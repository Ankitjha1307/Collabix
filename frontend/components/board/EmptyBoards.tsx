import { LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function EmptyBoards() {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 rounded-3xl py-20">
      <LayoutGrid className="h-14 w-14 text-muted-foreground" />

      <div className="text-center">
        <h3 className="text-lg font-semibold">
          No boards yet
        </h3>

        <p className="text-muted-foreground">
          Create your first board to start organizing tasks.
        </p>
      </div>
    </Card>
  );
}