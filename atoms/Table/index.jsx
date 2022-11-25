import { useState } from "react";
import { useRouter } from "next/router";
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
  Skeleton,
  Box,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DownloadIcon from "@mui/icons-material/Download";

const transactions = (column, row) => {
  const value = row[column.id];
  const clicker = column.onClick;
  if (column.label === "Details") {
    return (
      <MoreHorizIcon
        onClick={(e) => {
          return clicker(row);
        }}
      />
    );
  }
  if (column.label === "Status") {
    if (value === 1) {
      return (
        <Box sx={{ color: (theme) => theme.colors.successGreen }}>Success</Box>
      );
    }
    return <Box sx={{ color: (theme) => theme.colors.errorRed }}>Failed</Box>;
  }

  return column.format && typeof value === "number" ? (
    <Box>{column.format(value)}</Box>
  ) : (
    <Box>{value}</Box>
  );
};

const reports = (column, row) => {
  const value = row[column.id];
  const clicker = column.onClick;
  if (column.id === "download") {
    return (
      <DownloadIcon
        onClick={(e) => {
          return clicker(row);
        }}
        sx={{ cursor: "pointer" }}
      />
    );
  }

  return column.format && typeof value === "number" ? (
    <Box>{column.format(value)}</Box>
  ) : (
    <Box>{value}</Box>
  );
};

const rowSwitcher = (column, value, name) => {
  switch (name) {
    case "payins":
      return transactions(column, value);
    case "payouts":
      return transactions(column, value);
    case "billing":
      return transactions(column, value);
    case "payinsReports":
      return reports(column, value);
    case "payoutsReports":
      return reports(column, value);
    default:
      return transactions(column, value);
  }
};

const MuiTable = ({
  columns,
  rows,
  loading,
  currentPage,
  name,
  totalPages,
}) => {
  const [page, setPage] = useState(parseInt(currentPage, 10));
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    router.push(
      {
        pathname: `${router.pathname}`,
        query: { pid: router.query.pid, page: `${newPage}` },
      },
      undefined,
      {
        shallow: true,
      }
    );
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", boxShadow: "none" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            "& .MuiTableRow-root:hover": {
              backgroundColor: "blue",
            },
          }}
        >
          {/* {change keys to column.id when all columns get their id} */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  align={column.align}
                  // style={{ width: 200 }}
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
              .map((row, index) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: (theme) => theme.colors.mono9,
                      },
                    }}
                  >
                    {columns.map((column, index1) => {
                      return (
                        <TableCell
                          key={column.label}
                          align={column.align}
                          sx={column?.formatting}
                          onClick={column?.onClick}
                        >
                          {loading ? (
                            <Box sx={{ width: "100%" }}>
                              <Skeleton sx={{ width: "100%" }} />
                            </Box>
                          ) : (
                            rowSwitcher(column, row?.attributes || row, name)
                          )}
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
        count={totalPages}
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
  );
};

MuiTable.defaultProps = {
  currentPage: 0,
  loading: false,
};

MuiTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  totalPages: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default MuiTable;
