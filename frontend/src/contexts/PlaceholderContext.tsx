import { createContext, ReactNode, useContext } from "react";

interface PlaceholderContextValue {
  value: string;
}

const PlaceholderContext = createContext<PlaceholderContextValue | undefined>(undefined);

export function PlaceholderProvider({ children }: { children: ReactNode }) {
  return (
    <PlaceholderContext.Provider value={{ value: "placeholder" }}>
      {children}
    </PlaceholderContext.Provider>
  );
}

export function usePlaceholderContext() {
  const context = useContext(PlaceholderContext);
  if (!context) {
    throw new Error("usePlaceholderContext must be used within PlaceholderProvider");
  }
  return context;
}
