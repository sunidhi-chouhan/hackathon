import type { CSSProperties, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export function Card({ children, className = "", hover = false, style }: CardProps) {
  return (
    <div
      className={`rounded-xl border p-6 shadow-sm transition-colors duration-200 ${
        hover ? "hover:shadow-md" : ""
      } ${className}`}
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
        color: "var(--foreground)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
        {title}
      </h3>
      {subtitle && (
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
