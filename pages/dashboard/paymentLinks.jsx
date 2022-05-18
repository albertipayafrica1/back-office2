import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const PaymentLinks = () => {
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
      Payment Links is Coming Soon
    </Typography>
  );
};
export default PaymentLinks;
PaymentLinks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
