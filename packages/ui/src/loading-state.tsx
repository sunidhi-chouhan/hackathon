interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = "Discovering cultural treasures..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4"
        style={{
          borderColor: "var(--border)",
          borderTopColor: "var(--accent)",
        }}
      />
      <p className="theme-text-muted text-sm">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message,
  title = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="rounded-xl border p-6 text-center"
      style={{
        borderColor: "color-mix(in srgb, #ef4444 35%, var(--border))",
        background: "color-mix(in srgb, #ef4444 8%, var(--surface))",
      }}
      role="alert"
    >
      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
        {title}
      </p>
      <p className="theme-text-muted mt-2 text-sm leading-relaxed">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="theme-btn-primary mt-4 px-6 py-2 text-sm"
        >
          Try again
        </button>
      )}
    </div>
  );
}

interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="theme-card border-dashed p-12 text-center">
      <p className="theme-text-muted text-sm">{message}</p>
    </div>
  );
}
