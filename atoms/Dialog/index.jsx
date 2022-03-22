import PropTypes from "prop-types";
import * as React from "react";
import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./styles";

const DialogView = ({ onClose, open, children }) => {
  return (
    <Dialog open={open}>
      {/* PaperProps={{ sx: position }} */}
      <IconButton sx={styles.closeIcon}>
        <CloseIcon onClick={onClose} />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default DialogView;

DialogView.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
