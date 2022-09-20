import { Typography } from "@mui/material";

import DashboardLayout from "../../../../components/Layouts/Dashboard";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import CreateNewUser from "../../../../components/Settings/Users/CreateNewUser";
import FilterDialog from "../../../../components/Settings/Users/FilterDialog";

const Users = () => {
  return <FilterDialog open />;
};

export default Users;

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = ProtectedRoute(async (context) => {
  return {
    props: {},
  };
});
