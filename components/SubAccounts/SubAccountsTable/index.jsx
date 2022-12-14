import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../../atoms/TransactionButton";
import Table from "../../../atoms/Table";
import PageViewBox from "../../../atoms/PageViewBox";

import FilterDialog from "../FilterDialog";
import ExportDialog from "../../ExportDialog";

import * as styles from "./styles";
import AddSubAccounts from "../AddSubAccounts";

import { subAccountColumns } from "./data";

const SubAccountsTable = ({ name, rows, loading, currentPage, setData }) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }
  const columns = subAccountColumns;

  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [openAddSubAccounts, setOpenAddSubAccounts] = useState(false);

  const toggleFilterDialog = () => {
    setOpenFilterDialog((prevState) => !prevState);
  };
  const toggleExportDialog = () => {
    setOpenExportDialog((prevState) => !prevState);
  };

  const toggleAddSubAccounts = () => {
    setOpenAddSubAccounts((prevState) => !prevState);
  };

  if (openAddSubAccounts) {
    return <AddSubAccounts toggleAddSubAccounts={toggleAddSubAccounts} />;
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
              text="Add Sub Accounts"
              icon={<img src="/addIcon.svg" alt="icon" />}
              onClick={toggleAddSubAccounts}
            />
          </Stack>

          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={3}
          >
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
      <FilterDialog
        setData={setData}
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
SubAccountsTable.defaultProps = {
  loading: false,
  currentPage: 0,
};

SubAccountsTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
  setData: PropTypes.func.isRequired,
};

export default SubAccountsTable;
