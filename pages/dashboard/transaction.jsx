import DashboardLayout from "../../components/Layouts/Dashboard";

const Transaction = () => {
  return <></>;
};
export default Transaction;
Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
