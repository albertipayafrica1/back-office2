import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const Home = () => {
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
      Dashboard is Coming Soon
    </Typography>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
