import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { OBDData } from "../types";

interface Props {
  data: OBDData | null;
}

interface Point {
  time: string;
  rpm: number;
  coolant: number;
}

export function HistoryChart({ data }: Props) {
  const [history, setHistory] = useState<Point[]>([]);

  useEffect(() => {
    if (!data) return;
    setHistory((prev) => {
      const next = [
        ...prev,
        {
          time: new Date(data.timestamp * 1000).toLocaleTimeString(),
          rpm: data.rpm ?? 0,
          coolant: data.coolant_temp ?? 0,
        },
      ];
      return next.slice(-40);
    });
  }, [data]);

  return (
    <section className="bg-[#1c2128] border border-[#2a303a] rounded p-5 mx-7 mb-7">
      <h2 className="text-sm font-semibold mb-3">Histórico RPM / Temperatura</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={history}>
          <CartesianGrid stroke="#2a303a" />
          <XAxis dataKey="time" stroke="#7a828e" fontSize={11} />
          <YAxis stroke="#7a828e" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "#181c22",
              border: "1px solid #2a303a",
            }}
          />
          <Line
            type="monotone"
            dataKey="rpm"
            stroke="#6ba3cf"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="coolant"
            stroke="#c98a2c"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
