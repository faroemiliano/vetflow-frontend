import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        bg-white
        p-6
        shadow-sm
        border
        border-slate-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}
