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
      className="mx-auto max-w-4xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-sm font-medium backdrop-blur-md">
        <Sparkles className="text-accent" />

        <span className="text-muted-foreground">
          Modern Project Management
        </span>
      </div>

      <h1 className="mt-10 text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
        From ideas to <span className="text-primary">Execution.</span>
      </h1>

      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Collaborate, manage projects, and ship faster with a workspace built for modern teams.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="group"
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
        >
          <Link
            href="https://github.com/ankitjha1307"
            target="_blank"
          >
            <FaGithub className="text-accent mr-2 h-4 w-4 rounded-full" />

            View GitHub
          </Link>
        </Button>
      </div>
      
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {features.map((feature) => (
          <div
            key={feature}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-accent/10"
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