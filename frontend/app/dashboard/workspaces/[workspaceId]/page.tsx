interface Props {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspacePage({
  params,
}: Props) {
  const { workspaceId } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Workspace {workspaceId}
      </h1>
    </div>
  );
}