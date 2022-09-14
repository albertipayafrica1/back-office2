import { Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import PaymentLinksTable from "../../../components/PaymentLinks/PaymentLinksTable/index";

const PaymentLinks = () => (
  <Box sx={{ p: 10 }}>
    <PaymentLinksTable />;
  </Box>
);

export default PaymentLinks;

PaymentLinks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
