import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const Settlements = () => {
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
      Settlements is Coming Soon
    </Typography>
  );
};
export default Settlements;
Settlements.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
