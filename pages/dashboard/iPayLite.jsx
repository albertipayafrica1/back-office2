import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const iPayLite = () => {
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
      iPay Lite is Coming Soon
    </Typography>
  );
};
export default iPayLite;

iPayLite.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
