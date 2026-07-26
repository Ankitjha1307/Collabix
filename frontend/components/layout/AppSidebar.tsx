"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "@/types/user";
import { getProfile } from "@/services/auth.service";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  LayoutDashboard,
  Briefcase,
  User2,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { logout } from "@/services/auth.service";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workspaces",
    url: "/dashboard/workspaces",
    icon: Briefcase,
  }
];

export function AppSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<User | null>(null);
    const { isMobile, setOpenMobile } = useSidebar();
    
    const handleLogout = async () => {
      try {
        await logout();

        localStorage.removeItem("accessToken");
        router.push("/login");
         if (isMobile) setOpenMobile(false);
      } catch (error) {
        console.error(error);
      }
    };

    const loadProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {loadProfile();}, []);

    const handleNavigation = () => {
      if (isMobile) setOpenMobile(false);
    };

    const initials = user?.name
    ? user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "U";


  return (
    <Sidebar className="border-r bg-background/80 backdrop-blur-xl">
      <SidebarHeader className="border-b px-5 py-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <Image
            src="/brand/logo.svg"
            alt="Collabix"
            width={100}
            height={100}
            className="flex h-12 w-16 items-center justify-center rounded-lg text-primary-foreground font-bold"
          />

          <div>
            <p className="text-base font-semibold tracking-tight">
              Collabix
            </p>

            <p className="text-xs text-muted-foreground">
              Project Management Platform
            </p>
          </div>
         </Link>
      </SidebarHeader>

      <SidebarContent>
        <p className="px-3 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Workspace
        </p>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-11 rounded-xl px-3 transition-all hover:bg-primary/10 hover:text-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-sm"
                    >
                      <Link href={item.url} onClick={handleNavigation}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="mb-4 rounded-2xl border bg-card p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {user?.name}
              </p>

              <p className="text-xs text-primary">
                {user?.username}
              </p>
            </div>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton  asChild className="h-11 rounded-xl hover:bg-primary/10 hover:text-primary" onClick={handleNavigation}>
              <Link href="#" className="flex items-center gap-3">
                <User2 />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="h-11 rounded-xl hover:bg-primary/10 hover:text-primary">
                <LogOut className="text-destructive hover:bg-destructive/10 hover:text-destructive h-5 w-5" />
                <span>Logout</span>
                </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-5 text-center text-xs text-muted-foreground">
          Collabix v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}