"use client";

import { useEffect } from "react";
import { ErrorState } from "@culturecompass/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="theme-bg flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md">
        <ErrorState
          title="Unexpected error"
          message="Something went wrong while loading this page. Please try again."
          onRetry={reset}
        />
      </div>
    </div>
  );
}
