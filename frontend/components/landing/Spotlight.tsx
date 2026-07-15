"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
}

export default function Spotlight({
  className,
}: SpotlightProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full",
        "bg-violet-500/15 blur-[140px]",
        "dark:bg-violet-500/20",
        className
      )}
    />
  );
}