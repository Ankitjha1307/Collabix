import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-28",
        className
      )}
    >
      {children}
    </section>
  );
}