import PropTypes from "prop-types";
import { Button, Typography, Box, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import * as styles from "./styles";

const TransactionButton = ({
  icon,
  text,
  onClick,
  activeState,
  withoutIconMedia,
  disabled,
  ...rest
}) => {
  const matches = useMediaQuery("(min-width:900px)");
  const matchesSmall = useMediaQuery("(min-width:600px)");

  if (withoutIconMedia) {
    if (matchesSmall && icon !== null) {
      return (
        <Button
          variant="outlined"
          sx={activeState ? styles.activeButton : styles.button}
          onClick={onClick}
          size="small"
          {...rest}
          disabled={disabled}
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
      <Box onClick={onClick} tabIndex={0} onKeyDown={() => {}} {...rest}>
        {icon !== undefined ? icon : text}
      </Box>
    );
  }
  return (
    <Button
      variant="outlined"
      sx={activeState ? styles.activeButton : styles.button}
      onClick={onClick}
      size="small"
      disabled={disabled}
      {...rest}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ mt: 1 }}> {icon} </Box>
        <Typography variant="caption2">{text}</Typography>
      </Stack>
    </Button>
  );
};

TransactionButton.defaultProps = {
  activeState: false,
  withoutIconMedia: false,
  disabled: false,
};
TransactionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeState: PropTypes.bool,
  withoutIconMedia: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TransactionButton;
