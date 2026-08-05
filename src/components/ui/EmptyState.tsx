interface EmptyStateProps {
  title: string;

  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}
