interface Option {
  value: number | string;
  label: string;
}

interface Props {
  label?: string;
  value: number | string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function Select({ label, value, options, onChange }: Props) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
