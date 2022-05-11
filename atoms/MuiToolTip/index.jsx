import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import * as styles from "./styles";

const MuiToolTip = ({ style, placement, title }) => {
  return (
    <>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: style,
          },
        }}
        placement={placement}
        title={title}
      >
        <img src="/infoicon.svg" alt="info-logo" style={styles.infoIcon} />
      </Tooltip>
    </>
  );
};

export default MuiToolTip;

MuiToolTip.propTypes = {
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
};
