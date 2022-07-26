import { Typography, Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import TransactionTable from "../../../components/TransactionTable";

const Settlements = () => {
  return (
    <Box sx={{ p: 10 }}>
      <Typography>
        <TransactionTable name="settlements" />
      </Typography>
    </Box>
  );
};

export default Settlements;

Settlements.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
