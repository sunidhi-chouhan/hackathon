import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "CultureCompass AI";

  return (
    <header className="theme-surface sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          <span className="theme-text text-lg font-bold">{appName}</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/"
            className="theme-text-muted transition-colors hover:opacity-80"
            style={{ color: "var(--muted)" }}
          >
            Discover
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
