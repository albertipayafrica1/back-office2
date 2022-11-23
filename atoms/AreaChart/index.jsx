import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Stack, useMediaQuery } from "@mui/material";

const data = [
  {
    name: "0",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "1",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "2",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "3",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "4",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "5",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "6",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ReAreaChart = () => {
  const matches = useMediaQuery("(min-width:930px)");
  return (
    <ResponsiveContainer width="95%" aspect={matches ? 4 : 0.8}>
      <AreaChart
        width={400}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="0 0"
          horizontal={false}
          vertical={false}
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#F4920080"
          fill="#F4920080"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ReAreaChart;
