"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: {
          duration: 0.8,
        },
        x: {
          duration: 0.8,
        },
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="relative"
    >
      {/* Glow */}

      <div className="absolute inset-0 -z-10 rounded-[40px] bg-primary/15 blur-3xl" />

      <div className="overflow-hidden rounded-3xl border bg-card shadow-2xl">

        <Image
          src="/hero/dashboard.png"
          alt="Collabix Dashboard"
          width={1600}
          height={1000}
          priority
          className="w-full"
        />

      </div>
    </motion.div>
  );
}