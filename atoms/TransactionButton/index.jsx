import PropTypes from "prop-types";
import { Button, Typography, Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import * as styles from "./styles";

const TransactionButton = ({ icon, text }) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Button variant="outlined" sx={styles.button}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ mt: 1 }}> {icon} </Box>
        {matches && <Typography>{text}</Typography>}
      </Stack>
    </Button>
  );
};

TransactionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default TransactionButton;
