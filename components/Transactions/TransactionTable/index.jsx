import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../../atoms/TransactionButton";
import Table from "../../../atoms/Table";
import PageViewBox from "../../../atoms/PageViewBox";

import BalanceDialog from "../../BalanceDialog";
import PayinsFilterDialog from "../Payins/FilterDialog";
import PayoutsFilterDialog from "../Payouts/FilterDialog";
import BillingFilterDialog from "../Billing/FilterDialog";
import ExportDialog from "../../ExportDialog";
import PayoutsNewTransfer from "../Payouts/NewTransfer";

import * as styles from "./styles";

import { tableColumnSwitcher } from "./data";

const TransactionTable = ({ name, rows, loading, currentPage }) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }
  const columns = tableColumnSwitcher(name);
  const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openNewTransfer, setOpenNewTransfer] = useState(false);

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

  if (openNewTransfer) {
    return <PayoutsNewTransfer toggleNewTransfer={toggleNewTransfer} />;
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
            {name === "payouts" && (
              <TransactionButton
                text="New Transfer"
                icon={<img src="/addIcon.svg" alt="icon" />}
                onClick={toggleNewTransfer}
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
          totalPages={100}
        />
      </PageViewBox>
      <BalanceDialog
        name={name}
        open={openBalanceDialog}
        toggleBalanceDialog={toggleBalanceDialog}
      />
      {name === "payins" && (
        <PayinsFilterDialog
          name={name}
          open={openFilterDialog}
          toggleFilterDialog={toggleFilterDialog}
        />
      )}
      {name === "payouts" && (
        <PayoutsFilterDialog
          name={name}
          open={openFilterDialog}
          toggleFilterDialog={toggleFilterDialog}
        />
      )}
      {name === "billing" && (
        <BillingFilterDialog
          name={name}
          open={openFilterDialog}
          toggleFilterDialog={toggleFilterDialog}
        />
      )}

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
  loading: false,
  currentPage: 0,
};

TransactionTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default TransactionTable;
