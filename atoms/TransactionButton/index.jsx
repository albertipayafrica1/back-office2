import PropTypes from "prop-types";
import { Button, Typography, Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import * as styles from "./styles";

const TransactionButton = ({ icon, text, onClick, activeState }) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Button
      variant="outlined"
      sx={activeState ? styles.activeButton : styles.button}
      onClick={onClick}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ mt: 1 }}> {icon} </Box>
        {matches && <Typography variant="caption2">{text}</Typography>}
      </Stack>
    </Button>
  );
};

TransactionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeState: PropTypes.bool.isRequired,
};

export default TransactionButton;
