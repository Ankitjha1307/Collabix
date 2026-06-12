import Link from "next/link";

export default function WorkspacesPage() {
  const workspaces = [
    {
      id: "1",
      name: "College Fest Team",
    },
    {
      id: "2",
      name: "Collabix Development",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Workspaces
      </h1>

      <div className="space-y-4">
        {workspaces.map((workspace) => (
          <Link href={`/dashboard/workspaces/${workspace.id}` } key={workspace.id} className="block p-4 border rounded hover:bg-gray-100">
            {workspace.name}
          </Link>
        ))}
      </div>
    </div>
  );
}