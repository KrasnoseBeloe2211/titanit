"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface BarChartBlockProps {
  data: ChartData[];
}

export const BarChartBlock = ({ data }: BarChartBlockProps) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(22, 27, 34, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(19, 167, 73, 0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 8px 32px rgba(19, 167, 73, 0.15)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#a0a3a8",
              fontSize: "13px",
              marginBottom: "6px",
            }}
          >
            {label}
          </p>
          <p
            style={{
              margin: 0,
              color: "#13a749",
              fontSize: "20px",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ position: "relative" }}>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FF88" stopOpacity={1} />
            <stop offset="100%" stopColor="#13a749" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </svg>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsBarChart data={data} barSize={40}>
          <XAxis
            dataKey="name"
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6B7280" }}
            dy={10}
          />

          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#6B7280" }}
            domain={[0, Math.ceil(maxValue / 10) * 10]}
            tickFormatter={(value) => `${value}%`}
            dx={-10}
          />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="value"
            fill="url(#barGradient)"
            radius={[12, 12, 0, 0]}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                style={{
                  filter: "drop-shadow(0 4px 12px rgba(19, 167, 73, 0.3))",
                }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
