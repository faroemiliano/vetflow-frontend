import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",

    secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",

    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      className={`
        rounded-lg
        px-4
        py-2
        font-medium
        transition
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
