import { useState } from "react";

import PropTypes from "prop-types";

import {
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
  Stack,
  MenuItem,
  Typography,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useStyles from "./styles";

const CustomInput = ({
  type,
  value,
  onChange,
  pClass,
  label,
  variant,
  name,
  haveTooltip,
  tooltipText,
  multiline,
  required,
  error,
  helperText,
  defaultValue,
  select,
  selectItem,
  ...restProps
}) => {
  const [visibility, setVisibility] = useState(false);
  const classes = useStyles();

  const typeChangeHandler = () => {
    setVisibility((prev) => !prev);
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label={<Typography variant="subtitle3">{label}</Typography>}
        defaultValue={defaultValue}
        id={label}
        variant={variant}
        className={[classes.root, pClass].join(" ")}
        type={type !== "password" ? type : visibility ? "text" : "password"}
        onChange={onChange}
        value={value}
        name={name}
        required={required}
        helperText={helperText}
        error={error}
        size="medium"
        fullWidth
        multiline={multiline}
        select={select}
        sx={{
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: (theme) => theme.colors.blue,
            },
          },
          "& .MuiOutlinedInput-root": {
            "& .Mui-focused": {
              borderColor: (theme) => theme.colors.blue,
            },
          },
          "& .MuiFormLabel-root": {
            color: (theme) => theme.colors.mono4,
            "& .Mui-focused": {
              color: (theme) => theme.colors.blue,
            },
          },
        }}
        InputProps={{
          className: classes.input,
          endAdornment: (
            <InputAdornment position="start">
              {type === "password" ? (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={typeChangeHandler}
                >
                  {visibility ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ) : (
                haveTooltip && (
                  <Tooltip
                    title={tooltipText}
                    arrow
                    className={classes.tooltip}
                  >
                    <IconButton className={classes.infoIcon}>
                      <InfoOutlinedIcon
                        sx={{
                          color: (theme) => theme.colors.orange,
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                )
              )}
            </InputAdornment>
          ),
        }}
        {...restProps}
      >
        {select &&
          selectItem.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.value}
            </MenuItem>
          ))}
      </TextField>
    </Stack>
  );
};

CustomInput.defaultProps = {
  pClass: "",
  tooltipText: "",
  haveTooltip: false,
  multiline: false,
  variant: "outlined",
  required: false,
  error: false,
  helperText: "",
  select: false,
  selectItem: [],
  defaultValue: "",
};

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  haveTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  multiline: PropTypes.bool,
  pClass: PropTypes.string,
  variant: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  select: PropTypes.bool,
  selectItem: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
};

export default CustomInput;
