"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export const BarChartBlock = ({ data }: any) => {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value" />
    </BarChart>
  );
};