import PropTypes from "prop-types";

import { Typography, Stack, Box } from "@mui/material";

import Dialog from "../../../atoms/Dialog";

import TransactionButton from "../../../atoms/TransactionButton";

import * as styles from "./styles";

const InitiationConfirmationDialog = ({
  open,
  toggleInitiationConfirmationDialog,
  settlementType,
  handleResetAll,
}) => {
  return (
    <Dialog
      open={open}
      onClose={toggleInitiationConfirmationDialog}
      backDropVisible={false}
      paperPropsStyling={styles.paperPropsStyling}
      dialogTitleStyling={styles.dialogTitleStyling}
      dialogTitle=""
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        sx={{ mt: 3, mb: 3 }}
      >
        <img src="/successGreenIcon.svg" alt="success" />
        <Typography
          variant="title4"
          sx={{ color: (theme) => theme.colors.blue }}
        >
          Great
        </Typography>
        <Typography variant="subtitle2">
          Your {settlementType} has been initiated
        </Typography>

        <Box sx={{ width: "25%" }}>
          <TransactionButton
            text="close"
            onClick={handleResetAll}
            activeState
          />
        </Box>
      </Stack>
    </Dialog>
  );
};

InitiationConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleInitiationConfirmationDialog: PropTypes.func.isRequired,
  handleResetAll: PropTypes.func.isRequired,
  settlementType: PropTypes.string.isRequired,
};
export default InitiationConfirmationDialog;
