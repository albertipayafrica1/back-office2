import PropTypes from "prop-types";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDateRangePicker, LocalizationProvider } from "@mui/lab";
import { TextField, Box, Typography } from "@mui/material";

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
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            sx={{ width: "100%" }}
          >
            <MobileDateRangePicker
              {...field}
              {...restProps}
              inputFormat="dd/MM/yyyy"
              InputProps={{
                classes: { root: classes.root },
              }}
              maxDate={new Date()}
              onChange={onChange !== "" ? onChange : form.handleChange}
              onBlur={onBlur !== "" ? onBlur : form.handleBlur}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField
                    {...startProps}
                    helperText={
                      Boolean(getIn(form.errors, name)) && form.errors[name][0]
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
                      shrink: !(
                        field !== undefined &&
                        field.value !== undefined &&
                        field.value !== null &&
                        field.value.length <= 0
                      ),
                      className:
                        field !== undefined &&
                        field.value !== undefined &&
                        field.value !== null &&
                        field.value.length <= 0
                          ? classes.inputLabelNoShrink
                          : undefined,
                    }}
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
                  />
                  <Box sx={{ mx: 2 }}> - </Box>
                  <TextField
                    {...endProps}
                    helperText={
                      Boolean(getIn(form.errors, name)) && form.errors[name][1]
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
                      shrink: !(
                        field !== undefined &&
                        field.value !== undefined &&
                        field.value !== null &&
                        field.value.length <= 0
                      ),
                      className:
                        field !== undefined &&
                        field.value !== undefined &&
                        field.value !== null &&
                        field.value.length <= 0
                          ? classes.inputLabelNoShrink
                          : undefined,
                    }}
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
                  />
                </>
              )}
            />
          </LocalizationProvider>
        );
      }}
    </FastField>
  );
};

FormikDateRangePicker.defaultProps = {
  onChange: "",
  onBlur: "",
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
