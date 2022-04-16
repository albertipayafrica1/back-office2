import PropTypes from "prop-types";

import { Typography, Stack } from "@mui/material";

const ErrorBoundary = ({ error }) => {
  if (error !== "") {
    return (
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="title6">{error}</Typography>
      </Stack>
    );
  }
  return (
    <Stack alignItems="center" justifyContent="center">
      <Typography variant="title6">
        Oops an error occured while processing your request
      </Typography>
    </Stack>
  );
};

ErrorBoundary.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorBoundary;
