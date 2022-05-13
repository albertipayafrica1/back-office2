import PropTypes from "prop-types";
import { Button, Typography, Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import * as styles from "./styles";

const TransactionButton = ({ icon, text, onClick, activeState }) => {
  const matches = useMediaQuery("(min-width:900px)");
  const matchesSmall = useMediaQuery("(min-width:600px)");

  if (matchesSmall) {
    return (
      <Button
        variant="outlined"
        sx={activeState ? styles.activeButton : styles.button}
        onClick={onClick}
        size="small"
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
  }

  return (
    <Box onClick={onClick} tabIndex={0} onKeyDown={() => {}}>
      {icon}
    </Box>
  );
};

TransactionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeState: PropTypes.bool.isRequired,
};

export default TransactionButton;
