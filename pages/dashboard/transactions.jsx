import DashboardLayout from "../../components/Layouts/Dashboard";
import Tabs from "../../atoms/Tabs";
import TransactionTable from "../../components/TransactionTable";

const Transaction = () => {
  const tabTitle = ["ds", "dss"];
  return (
    <Tabs tabTitle={tabTitle}>
      <TransactionTable />
      <>dfs</>
    </Tabs>
  );
};
export default Transaction;
Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
