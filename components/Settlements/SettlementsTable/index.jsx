import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../../atoms/TransactionButton";
import Table from "../../../atoms/Table";
import PageViewBox from "../../../atoms/PageViewBox";

import BalanceDialog from "../../BalanceDialog";
import FilterDialog from "../FilterDialog";
import ExportDialog from "../../ExportDialog";

import * as styles from "./styles";
import ManageSettlements from "../ManageSettlements";

import { settlementColumns } from "./data";

const SettlementsTable = ({ name, rows, loading, currentPage }) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }
  const columns = settlementColumns;
  const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
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

  const toggleManageSettlements = () => {
    setOpenManageSettlements((prevState) => !prevState);
  };

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
            <TransactionButton
              text="Manage Settlements"
              icon={<img src="/addIcon.svg" alt="icon" />}
              onClick={toggleManageSettlements}
            />
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
SettlementsTable.defaultProps = {
  loading: false,
  currentPage: 0,
};

SettlementsTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default SettlementsTable;
