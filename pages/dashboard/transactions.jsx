import Add from "@mui/icons-material/Add";
import DashboardLayout from "../../components/Layouts/Dashboard";
import Tabs from "../../atoms/Tabs";
import TransactionTable from "../../components/TransactionTable";

const Transaction = () => {
  const tabTitle = ["Payins", "Payouts", "Billing"];

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
    {
      id: "population",
      label: "Population",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "size",
      label: "Size\u00a0(km\u00b2)",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "density",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "densdity",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "denssity",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    {
      id: "densidty",
      label: "Density",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  const rows = [
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
    {
      name: "India",
      code: "Icsdcdsxcsdc",
      population: 1324171354,
      density: 3287263,
    },
  ];
  return (
    <Tabs tabTitle={tabTitle}>
      <TransactionTable rows={rows} columns={columns} />
      <TransactionTable rows={rows} columns={columns} newTransferEnabled />
      <TransactionTable rows={rows} columns={columns} />
    </Tabs>
  );
};
export default Transaction;
Transaction.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
