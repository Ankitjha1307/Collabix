"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FolderKanban, Plus } from "lucide-react";
import Link from "next/link";

import { getProfile } from "@/services/auth.service";
import { getUserWorkspaces } from "@/services/workspace.service";

import type { User } from "@/types/user";
import type { Workspace } from "@/types/workspace";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const [profile, setProfile] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const [profileData, workspaceData] = await Promise.all([
          getProfile(),
          getUserWorkspaces(),
        ]);

        setProfile(profileData);
        setWorkspaces(workspaceData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="py-10">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm text-muted-foreground">
          Welcome back 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {profile?.name}
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here's a quick overview of your workspaces.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Your Workspaces
          </h2>

          <p className="text-muted-foreground">
            {workspaces.length} workspace
            {workspaces.length !== 1 && "s"}
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/workspaces">
            View All

            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {workspaces.length === 0 && (

        <Card className="rounded-2xl p-12">
          <div className="flex flex-col items-center text-center">
            <FolderKanban
              className="mb-5 text-muted-foreground"
              size={42}
            />

            <h3 className="text-xl font-semibold">
              No workspaces yet
            </h3>

            <p className="mt-2 max-w-md text-muted-foreground">
              Create your first workspace to start
              collaborating with your team.
            </p>

            <Button
              className="mt-6"
              asChild
            >
              <Link href="/dashboard/workspaces">

                <Plus className="mr-2 h-4 w-4" />

                Create Workspace

              </Link>
            </Button>
          </div>
        </Card>

      )}

      {workspaces.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {workspaces.map((workspace) => (
            <Card
              key={workspace._id}
              className="rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {workspace.name}
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Open to view boards and members
                  </p>
                </div>

                <FolderKanban className="text-primary" />

              </div>

              <Button
                className="mt-6 w-full"
                asChild
              >
                <Link
                  href={`/dashboard/workspaces/${workspace._id}`}
                >
                  Open Workspace
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}