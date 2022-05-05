import PropTypes from "prop-types";
import * as React from "react";
import { Dialog, DialogTitle, IconButton, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./styles";

const DialogView = ({
  onClose,
  open,
  children,
  paperPropsStyling,
  backDropVisible,
  dialogTitleStyling,
  dialogTitle,
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          ...paperPropsStyling,
        },
      }}
      open={open}
      BackdropProps={{ invisible: backDropVisible }}
    >
      <DialogTitle sx={dialogTitleStyling}>
        {dialogTitle}
        {onClose && dialogTitle === "" ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.colors.blue,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers={dialogTitle !== ""}>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogView;

DialogView.defaultProps = {
  paperPropsStyling: {},
  dialogTitleStyling: {},
  backDropVisible: false,
  dialogTitle: "",
};

DialogView.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  paperPropsStyling: PropTypes.shape({}),
  dialogTitleStyling: PropTypes.shape({}),
  backDropVisible: PropTypes.bool,
  dialogTitle: PropTypes.string,
};
