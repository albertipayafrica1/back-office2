import { Typography } from "@mui/material";

import DashboardLayout from "../../components/Layouts/Dashboard";

const KopeshaLoan = () => {
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
      Kopesha Loans is Coming Soon
    </Typography>
  );
};
export default KopeshaLoan;
KopeshaLoan.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
