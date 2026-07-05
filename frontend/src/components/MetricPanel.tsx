interface MetricPanelProps {
  label: string;
  value: number | null;
  unit: string;
  warn?: boolean;
}

export function MetricPanel({ label, value, unit, warn }: MetricPanelProps) {
  return (
    <div
      className={`bg-[#1c2128] border border-[#2a303a] border-l-4 rounded p-4 ${
        warn ? "border-l-[#c98a2c]" : "border-l-[#4a7fa5]"
      }`}
    >
      <h2 className="text-xs uppercase tracking-wide text-[#7a828e] mb-2 font-medium">
        {label}
      </h2>
      <div
        className={`text-3xl font-bold ${
          warn ? "text-[#c98a2c]" : "text-[#6ba3cf]"
        }`}
      >
        {value != null ? Math.round(value) : "--"}
      </div>
      <div className="text-xs text-[#7a828e] mt-1">{unit}</div>
    </div>
  );
}
