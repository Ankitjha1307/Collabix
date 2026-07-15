"use client";

import { motion } from "framer-motion";

import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import FeaturePill from "./FeaturePill";

const features = [
  "Workspaces",
  "Kanban",
  "RBAC",
  "Dark Mode",
];

export default function HeroContent() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="max-w-xl"
    >
      <HeroBadge />

      <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-7xl">
        From ideas
        <br />
        to{" "}
        <span className="text-primary">
          execution.
        </span>
      </h1>

      <p className="mt-8 text-lg leading-8 text-muted-foreground">
        Plan projects, organize workspaces,
        assign tasks, and collaborate with your
        entire team from one beautiful workspace.
      </p>

      <HeroButtons />

      <div className="mt-10 flex flex-wrap gap-3">
        {features.map((feature) => (
          <FeaturePill
            key={feature}
            text={feature}
          />
        ))}
      </div>
    </motion.div>
  );
}