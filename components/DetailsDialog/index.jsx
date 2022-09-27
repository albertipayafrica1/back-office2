import { useState } from "react";

import PropTypes from "prop-types";

import {
  Typography,
  Stack,
  Box,
  Grid,
  Table,
  TableRow,
  TableCell,
  tableCellClasses,
} from "@mui/material";

import Dialog from "../../atoms/Dialog";
import TransactionButton from "../../atoms/TransactionButton";

import ExportDialog from "../ExportDialog";

import * as styles from "./styles";

// const data = [
//   {
//     name: "dffsd",
//     date: "fdfd",
//     name1: "dffsdfdsfdssdfdsfsdfds",
//     date1: "fdfd",
//     name2: "dffsd",
//     date2: "fdfd",
//     name3: "dffsd",
//     date3: "fdfd",
//     name4: "dffsdfdsfdssdfdsfsdfds",
//     date4: "fdfd",
//     name5: "dffsd",
//     date5: "fdfd",
//   },
//   {
//     name: "dffsd",
//     date: "fdfd",
//     name1: "dffsdfdsfdssdfdsfsdfds",
//     date1: "fdfd",
//     name2: "dffsd",
//     date2: "fdfd",
//     name3: "dffsd",
//     date3: "fdfd",
//     name4: "dffsdfdsfdssdfdsfsdfds",
//     date4: "fdfd",
//     name5: "dffsd",
//     date5: "fdfd",
//   },
//   {
//     name1: "dffsd",
//     date1: "fdfd",
//     name2: "dffsdfdsfdssdfdsfsdfds",
//     date2: "fdfd",
//     name3: "dffsd",
//     date3: "fdfd",
//   },
//   {
//     name: "dffsd",
//     date: "fdfd",
//     name1: "dffsdfdsfdssdfdsfsdfds",
//     date1: "fdfd",
//     name2: "dffsd",
//     date2: "fdfd",
//     name3: "dffsd",
//     date3: "fdfd",
//     name4: "dffsdfdsfdssdfdsfsdfds",
//     date4: "fdfd",
//     name5: "dffsd",
//     date5: "fdfd",
//   },
// ];

const DetailsDialog = ({ open, toggleDetailsDialog, name, data }) => {
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const toggleExportDialog = () => {
    setOpenExportDialog((prevState) => !prevState);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleDetailsDialog}
        backDropVisible={false}
        paperPropsStyling={styles.paperPropsStyling}
        dialogTitleStyling={styles.dialogTitleStyling}
        dialogTitle={name}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={6}
          sx={{ p: 4 }}
        >
          <Typography
            variant="title6"
            sx={{
              color: (theme) => theme.colors.blue,
              fontWeight: 700,
              fontSize: "28px",
            }}
          >
            KES 1000000
          </Typography>
          <Box sx={{ width: "100px" }}>
            <TransactionButton
              text="Export"
              icon={<img src="/Export-icon.svg" alt="icon" />}
              onClick={toggleExportDialog}
              activeState={openExportDialog}
            />
          </Box>
        </Stack>
        <Grid container spacing={4} sx={{ width: "100%" }}>
          {data.map((item, index) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    border: "2px solid",
                    p: 3,
                    borderColor: (theme) => theme.colors.mono9,
                    borderRadius: "2px",
                    md: 6,
                  }}
                >
                  <Typography
                    variant="title5"
                    sx={{
                      color: (theme) => theme.colors.mono5,
                    }}
                  >
                    {name} Details
                  </Typography>

                  <Table sx={{ ml: 5 }}>
                    {Object.entries(item).map(([key, value]) => (
                      <TableRow
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                        }}
                        key={key}
                      >
                        <TableCell align="left" sx={{ p: 0, m: 0 }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 500,
                              textTransform: "capitalize",
                            }}
                          >{`${key}: `}</Typography>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            p: 0,
                            m: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: 300,
                            }}
                          >
                            {" "}
                            {value}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Stack direction="row" justifyContent="flex-end">
          <Typography
            sx={{ color: (theme) => theme.colors.orange, cursor: "pointer" }}
            onClick={() => {
              toggleDetailsDialog();
            }}
          >
            Back
          </Typography>
        </Stack>
      </Dialog>
      <ExportDialog
        name={name}
        open={openExportDialog}
        toggleExportDialog={toggleExportDialog}
        columns={[]}
        rows={[]}
      />
    </div>
  );
};

DetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDetailsDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default DetailsDialog;
