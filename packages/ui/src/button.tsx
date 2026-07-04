import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const variantClasses = {
  primary:
    "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg",
  secondary:
    "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300",
  ghost: "bg-transparent hover:bg-stone-100 text-stone-700",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
