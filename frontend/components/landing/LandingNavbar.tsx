"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { ArrowRight, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import {Sparkles, Boxes} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const links = [
  {
    label: "Features",
    href: "#features",
    icon: Sparkles
  },  
  {
    label: "Product",
    href: "#product",
    icon: Boxes
  },
  {
    label: "GitHub",
    href: "https://github.com/ankitjha1307",
    icon: FaGithub
  },
];

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50">
      <Container>

        <div className="mt-4 flex h-18 items-center justify-between rounded-2xl border border-border bg-card/80 px-4 sm:px-6 backdrop-blur-2xl shadow-sm">
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

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <div className="flex items-center gap-3">
                  {link.label}
                </div>
              </Link>
            ))}

          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>

              <Button asChild className="rounded-xl px-6">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px] px-6 py-8">
              <div className="border-b pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/logo.svg"
                    alt="Collabix"
                    width={36}
                    height={36}
                  />

                  <div>
                    <h2 className="font-bold text-lg">
                      Collabix
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      Collaborate smarter. Deliver faster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <SheetClose asChild>
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all hover:bg-accent hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-accent" />
                          <span>{link.label}</span>
                        </div>

                        <span className="text-muted-foreground"><ArrowRight className="h-4 w-4"></ArrowRight></span>
                      </Link>
                    </SheetClose>
                  );
                  })}

                <Separator className="my-6" />

                <div className="mt-4 flex flex-col gap-3">
                  <SheetClose asChild>
                    <Button className="w-full rounded-xl" variant="outline" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button className="w-full rounded-xl" asChild>
                      <Link href="/register">
                        Sign Up
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </div>

              <p className="mt-8 text-center text-xs text-muted-foreground">Version 1.0</p>
            </SheetContent>
          </Sheet>

        </div>

      </Container>
    </header>
  );
}