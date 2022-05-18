import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";

const MuiToolTip = ({ style, placement, title, children }) => {
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: style,
        },
      }}
      placement={placement}
      title={title}
    >
      {children}
    </Tooltip>
  );
};

export default MuiToolTip;

MuiToolTip.propTypes = {
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};
