import PropTypes from "prop-types";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDateRangePicker, LocalizationProvider } from "@mui/lab";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  FormGroup,
} from "@mui/material";

import { FastField, getIn } from "formik";
import useStyles from "./styles";

const FormikDateRangePicker = ({
  name,
  onChange,
  onBlur,
  required,
  labelStart,
  labelEnd,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <FastField name={name}>
      {({ field, form }) => {
        return (
          <FormControl sx={{ width: "100%" }}>
            <FormGroup>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateRangePicker
                  {...field}
                  {...restProps}
                  inputFormat="dd/MM/yyyy"
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  maxDate={new Date()}
                  onChange={onChange !== null ? onChange : form.handleChange}
                  onBlur={onBlur !== null ? onBlur : form.handleBlur}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField
                        {...startProps}
                        helperText={
                          Boolean(getIn(form.errors, name)) &&
                          form.errors[name][0]
                        }
                        error={Boolean(getIn(form.errors, name))}
                        label={
                          <Typography
                            variant="subtitle3"
                            className={
                              Boolean(getIn(form.errors, name)) && classes.error
                            }
                          >
                            {labelStart}
                          </Typography>
                        }
                        InputProps={{
                          className: classes.input,
                        }}
                        required={required}
                        InputLabelProps={{
                          shrink: !(field?.value?.length <= 0),
                          className:
                            field?.value?.length <= 0
                              ? classes.inputLabelNoShrink
                              : undefined,
                        }}
                        sx={{
                          width: "100%",
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
                      />
                      <Box sx={{ mx: 2 }}> - </Box>
                      <TextField
                        {...endProps}
                        helperText={
                          Boolean(getIn(form.errors, name)) &&
                          form.errors[name][1]
                        }
                        error={Boolean(getIn(form.errors, name))}
                        label={
                          <Typography
                            variant="subtitle3"
                            className={
                              Boolean(getIn(form.errors, name)) && classes.error
                            }
                          >
                            {labelEnd}
                          </Typography>
                        }
                        InputProps={{
                          className: classes.input,
                        }}
                        required={required}
                        InputLabelProps={{
                          shrink: !(field?.value?.length <= 0),
                          className:
                            field?.value?.length <= 0
                              ? classes.inputLabelNoShrink
                              : undefined,
                        }}
                        sx={{
                          width: "100%",
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
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
            </FormGroup>
          </FormControl>
        );
      }}
    </FastField>
  );
};

FormikDateRangePicker.defaultProps = {
  onChange: null,
  onBlur: null,
};

FormikDateRangePicker.propTypes = {
  labelStart: PropTypes.string.isRequired,
  labelEnd: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};
export default FormikDateRangePicker;
