import { Check } from "lucide-react";

interface FeaturePillProps {
  text: string;
}

export default function FeaturePill({
  text,
}: FeaturePillProps) {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-border/70
        bg-background/60
        px-4
        py-2
        text-sm
        backdrop-blur-md
        transition-all
        duration-300
        hover:border-primary/40
        hover:bg-primary/5
      "
    >
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
        <Check className="h-3 w-3 text-primary" />
      </div>

      <span className="text-muted-foreground">
        {text}
      </span>
    </div>
  );
}