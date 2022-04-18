import { Box } from "@mui/material";
import DashboardLayout from "../../components/Layouts/Dashboard";
import HorizontalLinearStepper from "../../components/Stepper";

const Kyc = () => {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <HorizontalLinearStepper
        flow="registered"
        companyType="governmentDepartment"
        duration="longTerm"
      />
    </Box>
  );
};
export default Kyc;
Kyc.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
