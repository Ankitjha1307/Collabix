import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border bg-card p-4 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>

        <h2 className="text-lg font-semibold">Loading Dashboard...</h2>
      </div>
    </main>
  );
}