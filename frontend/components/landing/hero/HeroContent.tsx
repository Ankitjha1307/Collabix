"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

const features = [
  "Workspaces",
  "Kanban",
  "RBAC",
  "Dark Mode",
];

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium backdrop-blur-md">
        <Sparkles className="h-4 w-4 text-primary" />

        <span className="text-muted-foreground">
          Modern Project Management
        </span>
      </div>

      <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-7xl">
        From ideas
        <br />
        to <span className="text-primary">execution.</span>
      </h1>

      <p className="mt-8 text-lg leading-8 text-muted-foreground">
        Plan projects, organize workspaces, assign tasks and collaborate
        with your entire team from one beautiful workspace.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          asChild
          size="lg"
          className="group rounded-xl"
        >
          <Link href="/register">
            Start Building

            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>

        <Button
          variant="outline"
          size="lg"
          asChild
          className="rounded-xl"
        >
          <Link
            href="https://github.com/ankitjha1307"
            target="_blank"
          >
            <FaGithub className="mr-2 h-4 w-4" />

            View GitHub
          </Link>
        </Button>
      </div>
      
      <div className="mt-10 flex flex-wrap gap-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-3 w-3 text-primary" />
            </div>

            <span className="text-muted-foreground">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}