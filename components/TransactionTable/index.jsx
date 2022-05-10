import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { Box, Stack } from "@mui/material";

import TransactionButton from "../../atoms/TransactionButton";

import Table from "../../atoms/Table";

import * as styles from "./styles";
import BalanceDialog from "../BalanceDialog";

const columns = [
  { id: "name", label: "Date", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Customer",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Channel",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densdity",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "denssity",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densidty",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densidty",
    label: "Details",
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

const TransactionTable = ({
  name,
  handleApplyFilter,
  handleExport,
  handleNewTransfer,
}) => {
  const [openBalanceDialog, setOpenBalanceDialog] = useState(false);

  const toggleBalanceDialog = () => {
    setOpenBalanceDialog((prevState) => !prevState);
  };
  // based on name get table data in useeffect
  // take rows and columns from endpoints and have a loading state here i.e show loader when data is fetched
  return (
    <>
      <Box sx={styles.tableContainer}>
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
              onClick={toggleBalanceDialog}
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
        <Table columns={columns} rows={rows} name={name} />
      </Box>
      <BalanceDialog
        name={name}
        open={openBalanceDialog}
        toggleBalanceDialog={toggleBalanceDialog}
      />
    </>
  );
};

TransactionTable.defaultProps = {
  handleApplyFilter: () => {},
  handleExport: () => {},
  handleNewTransfer: () => {},
};

TransactionTable.propTypes = {
  handleApplyFilter: PropTypes.func,
  handleExport: PropTypes.func,
  handleNewTransfer: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default TransactionTable;