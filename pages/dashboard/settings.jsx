import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const Settings = () => {
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
      Settings is Coming Soon
    </Typography>
  );
};

export default Settings;
Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
