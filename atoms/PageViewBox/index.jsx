import PropTypes from "prop-types";
import { Box } from "@mui/material";

import * as styles from "./styles";

const PageViewBox = ({ children }) => {
  return <Box sx={styles.container}>{children}</Box>;
};

PageViewBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageViewBox;
