import DashboardLayout from "../../components/Layouts/Dashboard";

const Settings = () => {
  return <></>;
};

export default Settings;
Settings.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
