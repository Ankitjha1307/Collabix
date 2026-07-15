"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Product",
    href: "#product",
  },
  {
    label: "GitHub",
    href: "https://github.com/ankitjha1307",
  },
];

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50">
      <Container>

        <div className="mt-4 flex h-18 items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-6 backdrop-blur-xl">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <Image
              src="/brand/logo.svg"
              alt="Collabix"
              width={34}
              height={34}
            />

            <span className="text-xl font-bold tracking-tight">
              Collabix
            </span>
          </Link>

          {/* Center */}

          <nav className="hidden items-center gap-10 lg:flex">

            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  text-sm
                  font-medium
                  text-muted-foreground
                  transition-colors
                  hover:text-foreground
                "
              >
                {link.label}
              </Link>
            ))}

          </nav>

          {/* Right */}

          <div className="flex items-center gap-3">

            <ThemeToggle />

            <Button
              variant="ghost"
              asChild
            >
              <Link href="/login">
                Login
              </Link>
            </Button>

            <Button
              asChild
              className="rounded-xl px-6"
            >
              <Link href="/register">
                Start Building
              </Link>
            </Button>

          </div>

        </div>

      </Container>
    </header>
  );
}