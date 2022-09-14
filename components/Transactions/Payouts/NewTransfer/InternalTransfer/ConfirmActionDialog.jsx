import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { Typography, Stack } from "@mui/material";

import Dialog from "../../../../../atoms/Dialog";

import TransactionButton from "../../../../../atoms/TransactionButton";

import colors from "../../../../../styles/colors";

import * as styles from "./styles";

const ConfirmActionDialog = ({
  open,
  toggleConfirmActionDialog,
  amount,
  handleConfirmTransfer,
}) => {
  const globalCurrency = useSelector((state) => state.currency.globalCurrency);

  return (
    <Dialog
      open={open}
      onClose={toggleConfirmActionDialog}
      backDropVisible={false}
      paperPropsStyling={styles.paperPropsStyling}
      dialogTitleStyling={styles.dialogTitleStyling}
      dialogTitle="Confirm Action"
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={6}
        sx={{ mt: 3, mb: 3 }}
      >
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          Are you sure you want to transfer{" "}
          <span style={{ color: colors.orange }}>{globalCurrency}</span>{" "}
          {amount} to your Settlement Account?
        </Typography>

        <Stack direction="row" alignItems="center" spacing={3}>
          <TransactionButton
            text="Cancel"
            onClick={toggleConfirmActionDialog}
          />

          <TransactionButton
            text="Confirm"
            onClick={handleConfirmTransfer}
            activeState
          />
        </Stack>
      </Stack>
    </Dialog>
  );
};

ConfirmActionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleConfirmActionDialog: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  handleConfirmTransfer: PropTypes.func.isRequired,
};
export default ConfirmActionDialog;
