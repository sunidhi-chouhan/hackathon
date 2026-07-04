import Link from "next/link";

export function Header() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "CultureCompass AI";

  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          <span className="text-lg font-bold text-stone-900">{appName}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-stone-600">
          <Link href="/" className="transition-colors hover:text-amber-700">
            Discover
          </Link>
        </nav>
      </div>
    </header>
  );
}
