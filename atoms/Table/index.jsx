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

const MuiTable = ({ columns, rows, loading, currentPage }) => {
  const [page, setPage] = useState(currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const router = useRouter();

  console.log(router);

  const handleChangePage = (event, newPage) => {
    router.push(
      {
        pathname: `${router.pathname}`,
        query: { pid: router.query.pid, page: newPage },
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
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
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
                      const value = row[column.id];

                      return (
                        <TableCell
                          key={index1}
                          align={column.align}
                          // sx={{ color: "blue" }}
                        >
                          {loading && (
                            <Box sx={{ width: "100%" }} key={index1}>
                              <Skeleton sx={{ width: "100%" }} />
                            </Box>
                          )}
                          {!loading &&
                            (column.format && typeof value === "number"
                              ? column.format(value)
                              : value)}
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
};

export default MuiTable;
