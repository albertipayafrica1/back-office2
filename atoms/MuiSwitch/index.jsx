import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import { useStyles } from "./styles";

const MuiSwitch = ({ checked, toggleSwitch, externalStyles, disabled }) => {
  const classes = useStyles({ ...externalStyles, checked });
  return (
    <Switch
      size="medium"
      checked={checked}
      onChange={toggleSwitch}
      disabled={disabled}
      inputProps={{ "aria-label": "controlled" }}
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
    />
  );
};

MuiSwitch.defaultProps = {
  externalStyles: {},
  disabled: false,
};

MuiSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  toggleSwitch: PropTypes.func.isRequired,
  externalStyles: PropTypes.shape({}),
  disabled: PropTypes.bool,
};

export default MuiSwitch;
