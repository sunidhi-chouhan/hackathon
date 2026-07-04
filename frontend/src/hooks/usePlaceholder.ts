import { useEffect, useState } from "react";
import { fetchPlaceholder } from "../services/api";

export function usePlaceholder() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchPlaceholder()
      .then((result) => {
        setData(result);
      })
      .catch(() => {
        setError("Unable to load placeholder data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
