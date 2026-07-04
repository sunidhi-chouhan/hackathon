import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function Button({ label, className = "", ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
}
