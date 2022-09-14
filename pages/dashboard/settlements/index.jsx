import { Typography, Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SettlementsTable from "../../../components/Settlements/SettlementsTable";

const Settlements = () => {
  return (
    <Box sx={{ p: 10 }}>
      <SettlementsTable name="settlements" />
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
