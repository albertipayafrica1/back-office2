import * as React from "react";
import PropTypes from "prop-types";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Stack,
} from "@mui/material";

import Add from "@mui/icons-material/Add";

import TransactionButton from "../../atoms/TransactionButton";

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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

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

const TransactionTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        maxHeight: 590,
        background: "white",
        boxShadow: "0px 5px 5px 2px #888888",
        borderRadius: "5px",
        mt: 3,
        ml: 8,
        mr: 8,
      }}
    >
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        sx={{
          ml: 8,
          mr: 8,
          height: 100,
          background: "white",
          borderRadius: "5px",
        }}
      >
        <Stack>
          <TransactionButton
            text="New Transfer"
            icon={<img src="/Balance-icon.svg" alt="icon" />}
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
          />
          <TransactionButton
            text="Filter"
            icon={<img src="/Filter-icon.svg" alt="icon" />}
          />
          <TransactionButton
            text="Export"
            icon={<img src="/Export-icon.svg" alt="icon" />}
          />
        </Stack>
      </Stack>

      <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              "& .MuiTableRow-root:hover": {
                backgroundColor: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: 200 }}
                    // style={{ minWidth: column.minWidth }}
                    sx={{ color: (theme) => theme.colors.blue }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.code}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: (theme) => theme.colors.mono9,
                        },
                      }}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // sx={{
          //   ".MuiTablePagination-toolbar": {
          //     backgroundColor: "rgba(100,100,100,0.5)",
          //   },
          //   ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
          //     fontWeight: "bold",
          //     color: "blue",
          //   },
          // }}
        />
      </Paper>
    </Box>
  );
};

export default TransactionTable;
