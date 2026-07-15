import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
    <div
      className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      bg-background/80
      px-4
      py-2
      text-sm
      font-medium
      backdrop-blur-md
    "
    >
      <Sparkles className="h-4 w-4 text-violet-500" />

      <span className="text-muted-foreground">
        Modern Project Management
      </span>
    </div>
  );
}