import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import TransactionButton from "../../atoms/TransactionButton";
import Table from "../../atoms/Table";
import PageViewBox from "../../atoms/PageViewBox";

import BalanceDialog from "../BalanceDialog";
import FilterDialog from "../FilterDialog";
import ExportDialog from "../ExportDialog";

import * as styles from "./styles";

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
    id: "density1",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densdity2",
    label: "Category",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "denssity3",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densidty4",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "densidty5",
    label: "Details",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const rows = [
  {
    name: "India",
    code: "Icsdcdsxcsdc1",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc2",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc3",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc4",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc5",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc6",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc7",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc8",
    population: 1324171354,
    density: 3287263,
  },
  {
    name: "India",
    code: "Icsdcdsxcsdc9",
    population: 1324171354,
    density: 3287263,
  },
];

const TransactionTable = ({ name, handleApplyFilter, handleNewTransfer }) => {
  const [openBalanceDialog, setOpenBalanceDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const toggleBalanceDialog = () => {
    setOpenBalanceDialog((prevState) => !prevState);
  };
  const toggleFilterDialog = () => {
    setOpenFilterDialog((prevState) => !prevState);
  };

  const toggleExportDialog = () => {
    setOpenExportDialog((prevState) => !prevState);
  };
  // based on name get table data in useeffect
  // take rows and columns from endpoints and have a loading state here i.e show loader when data is fetched
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
        <Table columns={columns} rows={rows} name={name} />
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
};

TransactionTable.propTypes = {
  handleApplyFilter: PropTypes.func,
  handleNewTransfer: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default TransactionTable;
