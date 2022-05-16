import PropTypes from "prop-types";

import { CircularProgress, Box } from "@mui/material";

const getMargin = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

const Loader = ({ spaceAround = null, alignment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: spaceAround ? getMargin[spaceAround] : 0,
        ...alignment,
      }}
    >
      <CircularProgress sx={{ color: (theme) => theme.colors.blue }} />
    </Box>
  );
};

Loader.defaultProps = {
  spaceAround: null,
  alignment: {},
};

Loader.propTypes = {
  spaceAround: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  alignment: PropTypes.shape({}),
};

export default Loader;
