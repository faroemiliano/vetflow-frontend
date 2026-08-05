import type { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">{children}</table>
    </div>
  );
}
