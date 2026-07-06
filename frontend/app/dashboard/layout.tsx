"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { Navbar } from "@/components/layout/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getProfile } from "@/services/auth.service";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        await getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("accessToken");
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}