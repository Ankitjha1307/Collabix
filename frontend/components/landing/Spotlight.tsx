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
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}>
      <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[180px]" />

      <div className="absolute left-1/2 top-[45%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

      <div className="absolute left-1/2 bottom-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-primary/12 blur-[180px]" />
      </motion.div>
  );
}