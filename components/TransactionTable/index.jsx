import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../atoms/TransactionButton";
import Table from "../../atoms/Table";
import PageViewBox from "../../atoms/PageViewBox";

import BalanceDialog from "../BalanceDialog";
import FilterDialog from "../FilterDialog";
import ExportDialog from "../ExportDialog";
import PayoutsNewTransfer from "../Transactions/PayoutsNewTransfer";

import * as styles from "./styles";
import ManageSettlements from "../Settlements/ManageSettlements";

const columns = [
  { id: "receivingdatetime", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "fname",
    label: "Customer",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "channeltype",
    label: "Channel",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "txncode",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "sendernumber",
    label: "Category",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "txnamt",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Details",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const TransactionTable = ({
  name,
  rows,
  loading,
  currentPage,
  handleApplyFilter,
  handleNewTransfer,
}) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }
  const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openNewTransfer, setOpenNewTransfer] = useState(false);
  const [openManageSettlements, setOpenManageSettlements] = useState(false);

  const toggleBalanceDialog = () => {
    setOpenBalanceDialog((prevState) => !prevState);
  };
  const toggleFilterDialog = () => {
    setOpenFilterDialog((prevState) => !prevState);
  };
  const toggleExportDialog = () => {
    setOpenExportDialog((prevState) => !prevState);
  };
  const toggleNewTransfer = () => {
    setOpenNewTransfer((prevState) => !prevState);
  };

  const toggleManageSettlements = () => {
    setOpenManageSettlements((prevState) => !prevState);
  };

  // based on name get table data in useeffect
  // take rows and columns from endpoints and have a loading state here i.e show loader when data is fetched

  if (openNewTransfer) {
    return <PayoutsNewTransfer toggleNewTransfer={toggleNewTransfer} />;
  }
  if (openManageSettlements) {
    return (
      <ManageSettlements toggleManageSettlements={toggleManageSettlements} />
    );
  }

  return (
    <>
      <PageViewBox>
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={styles.whiteStack}
        >
          <Stack>
            {(name === "payouts" || name === "settlements") && (
              <TransactionButton
                text={
                  name === "payouts" ? "New Transfer" : "Manage Settlements"
                }
                icon={<img src="/addIcon.svg" alt="icon" />}
                onClick={
                  name === "payouts"
                    ? toggleNewTransfer
                    : toggleManageSettlements
                }
              />
            )}
          </Stack>

          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <TransactionButton
              text="Balance"
              icon={<img src="/Balance-icon.svg" alt="icon" />}
              onClick={toggleBalanceDialog}
              activeState={openBalanceDialog}
            />
            <TransactionButton
              text="Filter"
              icon={<img src="/Filter-icon.svg" alt="icon" />}
              onClick={toggleFilterDialog}
              activeState={openFilterDialog}
            />
            <TransactionButton
              text="Export"
              icon={<img src="/Export-icon.svg" alt="icon" />}
              onClick={toggleExportDialog}
              activeState={openExportDialog}
            />
          </Stack>
        </Stack>
        <Table
          columns={columns}
          rows={givenRows}
          name={name}
          loading={loading}
          currentPage={currentPage}
        />
      </PageViewBox>
      <BalanceDialog
        name={name}
        open={openBalanceDialog}
        toggleBalanceDialog={toggleBalanceDialog}
      />
      <FilterDialog
        name={name}
        open={openFilterDialog}
        toggleFilterDialog={toggleFilterDialog}
      />
      <ExportDialog
        name={name}
        open={openExportDialog}
        toggleExportDialog={toggleExportDialog}
        columns={columns}
        rows={rows}
      />
    </>
  );
};

TransactionTable.defaultProps = {
  handleApplyFilter: () => {},
  handleNewTransfer: () => {},
  loading: false,
  currentPage: 0,
};

TransactionTable.propTypes = {
  handleApplyFilter: PropTypes.func,
  handleNewTransfer: PropTypes.func,
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default TransactionTable;
