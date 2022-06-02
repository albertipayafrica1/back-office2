import { Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";

import Tabs from "../../../atoms/Tabs";
import TransactionTable from "../../../components/TransactionTable";

const Transaction = () => {
  const tabTitle = ["Payins", "Payouts", "Billing"];

  const positionStyles = {
    position: "sticky",
    top: { xs: 105, sm: 108, md: 109 },
    backgroundColor: (theme) => theme.colors.mono1,
    width: "100%",
    zIndex: 999,
    height: "60px",
  };

  return (
    <Box sx={{ p: 10 }}>
      <Tabs tabTitle={tabTitle} positionStyles={positionStyles}>
        <TransactionTable name="payins" />
        <TransactionTable name="payouts" />
        <TransactionTable name="billing" />
      </Tabs>
    </Box>
  );
};

export default Transaction;

Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
