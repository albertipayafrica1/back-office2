import { Box } from "@mui/material";

import DashboardLayout from "../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../components/ProtectedRoute";
import SubAccountsTable from "../../../components/SubAccounts/SubAccountsTable";

const SubAccounts = () => {
  return (
    <Box sx={{ p: 10 }}>
      <SubAccountsTable name="subAccounts" />
    </Box>
  );
};

export default SubAccounts;

SubAccounts.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
