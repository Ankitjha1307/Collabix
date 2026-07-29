"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { User2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfile, logout } from "@/services/auth.service";
import { User } from "@/types/user";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

const pageConfig: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Manage your projects and workspaces.",
  },

  "/dashboard/workspaces": {
    title: "Workspaces",
    subtitle: "Hub to all your collaboration work",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const currentPage =
    pageConfig[pathname] ?? {
      title: "Dashboard",
      subtitle: "Collaborate smarter",
    };

    const handleLogout = async () => {
      await logout();
      localStorage.removeItem("accessToken");
      router.replace("/login");
    };

    const loadProfile = async () => {
      const profileData = await getProfile();
      setUser(profileData);
    }

    useEffect(() => {loadProfile();}, []);

    const initials = user?.name
    ? user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="rounded-lg border hover:bg-accent" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {currentPage.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 cursor-pointer border transition hover:ring-2 hover:ring-primary/30">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64"
            >
              <DropdownMenuLabel className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col p-2">
                    <span className="text-lg pb-1">{user?.name}</span>
                    <span className="text-xs text-primary text-muted-foreground pb-1">{user?.username}</span>                  
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary focus:text-primary-foreground">
                <Link
                  href="/dashboard/profile"
                >
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}