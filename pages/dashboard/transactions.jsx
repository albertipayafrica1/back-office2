import Add from "@mui/icons-material/Add";
import DashboardLayout from "../../components/Layouts/Dashboard";
import Tabs from "../../atoms/Tabs";
import TransactionTable from "../../components/TransactionTable";

const Transaction = () => {
  const tabTitle = ["Payins", "Payouts", "Billing"];

  return (
    <>
      <Tabs tabTitle={tabTitle}>
        <TransactionTable name="payins" />
        <TransactionTable name="payouts" />
        <TransactionTable name="billing" />
      </Tabs>
    </>
  );
};
export default Transaction;
Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
