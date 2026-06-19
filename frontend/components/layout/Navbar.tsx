import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Dashboard
        </h1>

        <ThemeToggle />
      </div>
    </header>
  );
}