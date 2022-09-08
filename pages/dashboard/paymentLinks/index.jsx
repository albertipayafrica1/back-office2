import { Typography } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import CreatePaymentLink from "../../../components/PaymentLinks/CreatePaymentLink";

const PaymentLinks = () => {
  return <CreatePaymentLink />;
};

export default PaymentLinks;

PaymentLinks.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
