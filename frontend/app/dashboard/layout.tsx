"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getProfile } from "@/services/auth.service";
import { Navbar } from "@/components/layout/Navbar";
import { LoadingSpinner } from "@/components/common/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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
        router.replace("/login");
      }finally{
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <Navbar/>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}