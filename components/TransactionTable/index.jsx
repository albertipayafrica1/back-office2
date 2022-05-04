import * as React from "react";
import PropTypes from "prop-types";

import { Box, Stack } from "@mui/material";

import TransactionButton from "../../atoms/TransactionButton";

import Table from "../../atoms/Table";

import * as styles from "./styles";

const TransactionTable = ({
  rows,
  columns,
  handleApplyFilter,
  handleBalanceCheck,
  handleExport,
  handleNewTransfer,
  newTransferEnabled,
}) => {
  return (
    <Box sx={styles.tableContainer}>
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={styles.whiteStack}
      >
        <Stack>
          {newTransferEnabled && (
            <TransactionButton
              text="New Transfer"
              icon={<img src="/addIcon.svg" alt="icon" />}
              onClick={handleNewTransfer}
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
            onClick={handleBalanceCheck}
          />
          <TransactionButton
            text="Filter"
            icon={<img src="/Filter-icon.svg" alt="icon" />}
            onClick={handleApplyFilter}
          />
          <TransactionButton
            text="Export"
            icon={<img src="/Export-icon.svg" alt="icon" />}
            onClick={handleExport}
          />
        </Stack>
      </Stack>
      <Table columns={columns} rows={rows} />
    </Box>
  );
};

TransactionTable.defaultProps = {
  handleApplyFilter: () => {},
  handleExport: () => {},
  handleNewTransfer: () => {},
  handleBalanceCheck: () => {},
};

TransactionTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleApplyFilter: PropTypes.func,
  handleExport: PropTypes.func,
  handleNewTransfer: PropTypes.func,
  handleBalanceCheck: PropTypes.func,
  newTransferEnabled: PropTypes.bool.isRequired,
};

export default TransactionTable;
