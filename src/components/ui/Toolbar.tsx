import type { ReactNode } from "react";

interface ToolbarProps {
  children: ReactNode;
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  );
}
