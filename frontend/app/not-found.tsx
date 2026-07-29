import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border bg-muted">
          <SearchX className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-6xl font-bold tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link href="/">
              Go Home
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </Button>
        </div>

      </div>
    </main>
  );
}