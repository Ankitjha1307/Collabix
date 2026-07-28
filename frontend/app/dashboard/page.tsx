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
  const [error, setError] = useState(false);

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
      } catch (err : any) {
        setError(err);
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
    <>
       {error && (
          <div className="mx-auto mb-6 w-full max-w-7xl rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}
        
      <div className="mx-auto w-full max-w-7xl space-y-16"> 
        <div className="flex flex-col gap-8 rounded-3xl border border-border bg-card p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              👋 Welcome back
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">
              {profile?.name}
            </h1>

            <p className="mt-3 max-w-2xl text-muted-foreground">
              Ready to organize your projects and collaborate with your team?
            </p>
          </div>

          <Button size="lg" asChild>
            <Link href="/dashboard/workspaces">
              <Plus className="mr-2 h-4 w-4" />
              New Workspace
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
              Your Workspaces
              <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accent">
                {workspaces.length}
              </span>
            </h2>
          </div>

          <Button
            className="mt-6"
            asChild
          >
            <Link href="/dashboard/workspaces">
              Go to workspaces
              <ArrowRight />
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
              <Link
                key={workspace._id}
                href={`/dashboard/workspaces/${workspace._id}`}
              >
                <Card className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <FolderKanban className="h-6 w-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">
                        {workspace.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Created{" "}
                        {new Date(workspace.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center text-sm font-medium text-primary">
                    Open Workspace
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}