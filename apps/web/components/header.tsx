import Link from "next/link";
import { Compass } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "CultureCompass AI";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Compass className="h-6 w-6 text-[var(--foreground)]" strokeWidth={1.75} aria-hidden="true" />
          <span className="theme-text text-base font-semibold tracking-tight sm:text-lg">{appName}</span>
        </Link>
        <nav className="flex items-center gap-3">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
