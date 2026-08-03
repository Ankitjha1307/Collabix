import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/brand/Logo.svg"
            alt="Collabix"
            width={28}
            height={28}
          />
          <span className="font-semibold tracking-tight">
            Collabix
          </span>
        </Link>
        
        <p className="hidden text-sm text-muted-foreground md:block">
          © {new Date().getFullYear()} Version 1.0 Built for better collaboration.
        </p>
        
        <div className="flex items-center gap-5 text-sm">
          <Link
            href="#product"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Product
          </Link>

          <Link
            href="#features"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>

          <Link
            href="https://github.com/Ankitjha1307/Collabix"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}