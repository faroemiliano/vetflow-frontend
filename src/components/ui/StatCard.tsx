import type { ReactNode } from "react";
import Card from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">{value}</h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>

        {icon && <div className="rounded-xl bg-slate-100 p-3">{icon}</div>}
      </div>
    </Card>
  );
}
