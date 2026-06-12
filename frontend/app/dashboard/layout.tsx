import Link from "next/link";
export default function DashboardLayout({children}: {children: React.ReactNode;}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4">
        <h2 className="mb-4 text-xl font-bold">Collabix</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/workspaces">Workspaces</Link>
          <Link href="/dashboard/profile">Profile</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}