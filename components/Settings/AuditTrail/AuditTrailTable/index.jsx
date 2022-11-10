import { useState } from "react";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import TransactionButton from "../../../../atoms/TransactionButton";
import Table from "../../../../atoms/Table";
import PageViewBox from "../../../../atoms/PageViewBox";

import FilterDialog from "../FilterDialog";
import ExportDialog from "../../../ExportDialog";

import * as styles from "./styles";

import { userColumns } from "./data";

const UsersTable = ({ name, rows, loading, currentPage }) => {
  let givenRows = rows;
  if (rows === null || rows === undefined) {
    givenRows = [];
  }
  const columns = userColumns;
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const toggleFilterDialog = () => {
    setOpenFilterDialog((prevState) => !prevState);
  };
  const toggleExportDialog = () => {
    setOpenExportDialog((prevState) => !prevState);
  };

  return (
    <>
      <Stack sx={styles.auditTrailTitle}>
        <Typography variant="subtitle4">Audit Trail</Typography>
      </Stack>
      <PageViewBox>
        <Stack
          justifyContent="flex-end"
          alignItems="center"
          direction="row"
          sx={styles.whiteStack}
        >
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

UsersTable.defaultProps = {
  loading: false,
  currentPage: 0,
};

UsersTable.propTypes = {
  name: PropTypes.string.isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
  loading: PropTypes.bool,
  currentPage: PropTypes.number,
};

export default UsersTable;
