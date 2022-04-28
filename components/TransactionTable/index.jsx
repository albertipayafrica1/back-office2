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
} from "@mui/material";

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
  createData("India", "Icsdcdsxcsdc", 1324171354, 3287263),
  createData("China", "Icsdcdsxcsdc", 1403500365, 9596961),
  createData("Italy", "Icsdcdsxcsdc", 60483973, 301340),
  createData("United States", "Icsdcdsxcsdc", 327167434, 9833520),
  createData("Canada", "Icsdcdsxcsdc", 37602103, 9984670),
  createData("Australia", "Icsdcdsxcsdc", 25475400, 7692024),
  createData("Germany", "Icsdcdsxcsdc", 83019200, 357578),
  createData("Ireland", "Icsdcdsxcsdc", 4857000, 70273),
  createData("Mexico", "Icsdcdsxcsdc", 126577691, 1972550),
  createData("Japan", "Icsdcdsxcsdc", 126317000, 377973),
  createData("France", "Icsdcdsxcsdc", 67022000, 640679),
  createData("United Kingdom", "Icsdcdsxcsdc", 67545757, 242495),
  createData("Russia", "Icsdcdsxcsdc", 146793744, 17098246),
  createData("Nigeria", "Icsdcdsxcsdc", 200962417, 923768),
  createData("Brazil", "Icsdcdsxcsdc", 210147125, 8515767),
];

const TransactionTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                    role="checkbox"
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
        //     // backgroundColor: "rgba(100,100,100,0.5)",
        //   },
        //   ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
        //     fontWeight: "bold",
        //     color: "blue",
        //   },
        // }}
      />
    </Paper>
  );
};

export default TransactionTable;
