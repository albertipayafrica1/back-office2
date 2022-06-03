import PropTypes from "prop-types";

import { Typography, Stack } from "@mui/material";

import Dialog from "../../atoms/Dialog";
import { downloadExcel, downloadPdf, downloadCsv } from "../../utils/export";

import * as styles from "./styles";

const ExportDialog = ({ open, toggleExportDialog, name, columns, rows }) => {
  return (
    <Dialog
      open={open}
      onClose={toggleExportDialog}
      backDropVisible={false}
      paperPropsStyling={styles.paperPropsStyling}
      dialogTitle="Export In"
      dialogTitleStyling={{
        color: (theme) => theme.colors.blue,
        fontSize: "13px",
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          onClick={() => {
            downloadExcel(rows);
            return toggleExportDialog();
          }}
          sx={{ cursor: "pointer" }}
        >
          <img src="/excel_icon.svg" alt="excel" />
          <Typography variant="subtitle6">EXCEL</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          onClick={() => {
            downloadCsv(rows);
            return toggleExportDialog();
          }}
          sx={{ cursor: "pointer" }}
        >
          <img src="/csv_icon.svg" alt="excel" />
          <Typography variant="subtitle6">CSV</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          onClick={() => {
            downloadPdf(columns, rows);
            return toggleExportDialog();
          }}
          sx={{ cursor: "pointer" }}
        >
          <img src="/pdf_icon.svg" alt="excel" />
          <Typography variant="subtitle6">PDF</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <Typography
            variant="subtitle5"
            sx={styles.cancelButton}
            onClick={toggleExportDialog}
          >
            Cancel
          </Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
};

ExportDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleExportDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf({}).isRequired,
  rows: PropTypes.arrayOf({}).isRequired,
};
export default ExportDialog;
