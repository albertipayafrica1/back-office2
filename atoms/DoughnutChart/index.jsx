import { PieChart, Pie, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Stack, useMediaQuery } from "@mui/material";

const data = [
  { name: "Mobile Money", value: 400, fill: "#9B51E0" },
  { name: "Cards", value: 300, fill: "#43648B" },
  { name: "Mobile Banking", value: 300, fill: "#D273FF" },
  { name: "Dunno", value: 200, fill: "#F6D0FF" },
];

const renderColorfulLegendText = (value) => {
  return <span style={{ color: "#596579", fontWeight: 500 }}>{value}</span>;
};

const DoughnutChart = () => {
  const matches = useMediaQuery("(min-width:930px)");

  return (
    <ResponsiveContainer width="100%" aspect={matches ? 3 : 0.8}>
      <PieChart>
        <Pie
          data={data}
          // cx={120}
          // cy={200}
          innerRadius={50}
          outerRadius={100}
          paddingAngle={0}
          dataKey="value"
          blendStroke
          startAngle={0}
          endAngle={360}
        />
        <Legend
          iconType="rect"
          //   layout={matches ? "vertical" : "horizontal"}
          //   verticalAlign={matches ? "middle" : "top"}
          //   align={matches ? "right" : "middle"}
          layout="horizontal"
          verticalAlign="center"
          align="center"
          iconSize={10}
          padding={5}
          formatter={renderColorfulLegendText}
        />
        <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DoughnutChart;
