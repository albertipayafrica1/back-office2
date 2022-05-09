import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Alert, Box } from "@mui/material";

import * as styles from "./styles";

const MuiAlert = ({ variant, message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Box sx={styles.AlertContainer}>
      {show && (
        <Alert
          variant="filled"
          severity={variant}
          sx={{ zindex: 999999999999 }}
        >
          {message}
        </Alert>
      )}
    </Box>
  );
};

MuiAlert.defaultProps = {
  variant: "info",
};

MuiAlert.propTypes = {
  variant: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default MuiAlert;
