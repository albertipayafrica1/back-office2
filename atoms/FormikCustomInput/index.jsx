import { useState } from "react";

import { Field, ErrorMessage, getIn, FastField } from "formik";
import PropTypes from "prop-types";

import {
  TextField,
  IconButton,
  InputAdornment,
  Tooltip,
  MenuItem,
  Typography,
  InputLabel,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// import { withStyles } from "@mui/styles";
import useStyles from "./styles";

const FormikCustomInput = ({
  type,
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
  select,
  selectItem,
  onChange,
  onBlur,
  fastField,
  ...restProps
}) => {
  const [visibility, setVisibility] = useState(false);
  const classes = useStyles();

  // const CssTextField = withStyles((theme) => ({
  //   root: {
  //     "& label.Mui-focused": {
  //       color: "#124AA1",
  //     },
  //     "& .MuiInput-underline:after": {
  //       borderBottomColor: "#124AA1",
  //     },
  //     "& .MuiOutlinedInput-root": {
  //       "& fieldset": {
  //         borderColor: "#C4C4C4",
  //       },
  //       "&:hover fieldset": {
  //         borderColor: "#124AA1",
  //       },
  //       "&.Mui-focused fieldset": {
  //         borderColor: "#124AA1",
  //       },
  //     },
  //   },
  // }))(TextField);

  const typeChangeHandler = () => {
    setVisibility((prev) => !prev);
  };

  if (fastField === false) {
    return (
      <Field name={name}>
        {({ field, form }) => {
          return (
            <TextField
              {...field}
              label={<Typography variant="subtitle3">{label}</Typography>}
              id={label}
              variant={variant}
              className={[classes.root, pClass].join(" ")}
              type={
                type !== "password" ? type : visibility ? "text" : "password"
              }
              name={name}
              onChange={onChange !== "" ? onChange : form.handleChange}
              onBlur={onBlur !== "" ? onBlur : form.handleBlur}
              required={required}
              helperText={<ErrorMessage name={name} />}
              error={Boolean(
                getIn(form.touched, name) && getIn(form.errors, name)
              )}
              placeholder={label}
              size="medium"
              fullWidth
              multiline={multiline}
              select={select}
              sx={{
                "& label": {
                  "&.Mui-focused": {
                    color: (theme) => theme.colors.blue,
                  },
                },
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
              InputLabelProps={{
                shrink: !(
                  field !== undefined &&
                  field.value !== undefined &&
                  field.value.length <= 0
                ),
                className:
                  field !== undefined &&
                  field.value !== undefined &&
                  field.value.length <= 0
                    ? classes.inputLabelNoShrink
                    : undefined,
                // style: {
                //   textOverflow: "ellipsis",
                //   whiteSpace: "nowrap",
                //   overflow: "hidden",
                //   width: "100%",
                //   //fontSize: "5px",
                //   // color: "green",
                // },
              }}
              InputProps={{
                // classes: { input: classes.input },
                className: !multiline ? classes.input : classes.multiline,
                endAdornment: (
                  <InputAdornment
                    position={type === "password" ? "end" : "start"}
                  >
                    {type === "password" ? (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={typeChangeHandler}
                      >
                        {visibility ? (
                          <Visibility sx={{ fontSize: 18 }} />
                        ) : (
                          <VisibilityOff sx={{ fontSize: 18 }} />
                        )}
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
                                fontSize: 18,
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
                  <MenuItem key={option.key} value={option.value}>
                    {option.key}
                  </MenuItem>
                ))}
            </TextField>
          );
        }}
      </Field>
    );
  }
  // password toggle doesnt work with fastfield
  return (
    <FastField name={name}>
      {({ field, form }) => {
        return (
          <TextField
            {...field}
            label={<Typography variant="subtitle3">{label}</Typography>}
            id={label}
            variant={variant}
            className={[classes.root, pClass].join(" ")}
            type={type !== "password" ? type : visibility ? "text" : "password"}
            name={name}
            onChange={onChange !== "" ? onChange : form.handleChange}
            onBlur={onBlur !== "" ? onBlur : form.handleBlur}
            required={required}
            helperText={<ErrorMessage name={name} />}
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
            placeholder={label}
            size="medium"
            fullWidth
            multiline={multiline}
            select={select}
            sx={{
              "& label": {
                "&.Mui-focused": {
                  color: (theme) => theme.colors.blue,
                },
              },
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
            InputLabelProps={{
              shrink: !(
                field !== undefined &&
                field.value !== undefined &&
                field.value.length <= 0
              ),
              className:
                field !== undefined &&
                field.value !== undefined &&
                field.value.length <= 0
                  ? classes.inputLabelNoShrink
                  : undefined,
              // style: {
              //   textOverflow: "ellipsis",
              //   whiteSpace: "nowrap",
              //   overflow: "hidden",
              //   width: "100%",
              //   //fontSize: "5px",
              //   // color: "green",
              // },
            }}
            InputProps={{
              className: !multiline ? classes.input : classes.multiline,
              endAdornment: (
                <InputAdornment
                  position={type === "password" ? "end" : "start"}
                >
                  {type === "password" ? (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={typeChangeHandler}
                    >
                      {visibility ? (
                        <Visibility sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityOff sx={{ fontSize: 18 }} />
                      )}
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
                              fontSize: 18,
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
                <MenuItem key={option.key} value={option.value}>
                  {option.key}
                </MenuItem>
              ))}
          </TextField>
        );
      }}
    </FastField>
  );
};

FormikCustomInput.defaultProps = {
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
  onChange: "",
  onBlur: "",
  fastField: true,
};

FormikCustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
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
  fastField: PropTypes.bool,
};

export default FormikCustomInput;
