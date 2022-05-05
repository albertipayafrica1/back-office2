import PropTypes from "prop-types";

import { Typography, Stack, Button } from "@mui/material";

import Dialog from "../../atoms/Dialog";

import * as styles from "./styles";

const BalanceDialog = ({ open, toggleBalanceDialog, name }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleBalanceDialog}
        backDropVisible={false}
        paperPropsStyling={styles.paperPropsStyling}
        dialogTitleStyling={styles.dialogTitleStyling}
        dialogTitle={`YOUR ${name.toUpperCase()} ACCOUNT BALANCE IS`}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={6}
          sx={{ mt: 3, mb: 3 }}
        >
          <Typography
            variant="title6"
            sx={{ color: (theme) => theme.colors.orange }}
          >
            {/* get these values from store */}
            <span style={{ color: "#000000" }}>KES</span>
            <span> 120000.00</span>
          </Typography>

          <Button variant="orange" onClick={toggleBalanceDialog}>
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
};

BalanceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleBalanceDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default BalanceDialog;
