import DashboardLayout from "../../components/Layouts/Dashboard";

const Home = () => {
  return <></>;
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
