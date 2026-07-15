"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <Button
        asChild
        size="lg"
        className="group rounded-xl"
      >
        <Link href="/register">
          Get Started
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
)}