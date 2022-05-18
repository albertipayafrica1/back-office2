import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const Reports = () => {
  return (
    <Typography
      variant="title6"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      Reports is Coming Soon
    </Typography>
  );
};
export default Reports;

Reports.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
