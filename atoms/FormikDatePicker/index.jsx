import PropTypes from "prop-types";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";

import { Field, ErrorMessage, getIn } from "formik";
import useStyles from "./styles";

const FormikDatePicker = ({
  name,
  onChange,
  onBlur,
  required,
  label,
  ...restProps
}) => {
  const classes = useStyles();

  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
            sx={{ width: "100%" }}
          >
            <FormGroup>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  {...field}
                  {...restProps}
                  maxDate={new Date()}
                  inputFormat="dd/MM/yyyy"
                  InputProps={{
                    classes: { root: classes.root },
                  }}
                  onChange={onChange !== "" ? onChange : form.handleChange}
                  onBlur={onBlur !== "" ? onBlur : form.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      error={Boolean(
                        getIn(form.touched, name) && getIn(form.errors, name)
                      )}
                      label={
                        <Typography
                          variant="subtitle3"
                          className={
                            Boolean(
                              getIn(form.touched, name) &&
                                getIn(form.errors, name)
                            ) && classes.error
                          }
                        >
                          {label}
                        </Typography>
                      }
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
                        // style: {
                        //   textOverflow: "ellipsis",
                        //   whiteSpace: "nowrap",
                        //   overflow: "hidden",
                        //   width: "100%",
                        //   //fontSize: "5px",
                        //   // color: "green",
                        // },
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
                  )}
                />
              </LocalizationProvider>
            </FormGroup>
            <FormHelperText>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

FormikDatePicker.defaultProps = {
  onChange: "",
  onBlur: "",
};

FormikDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FormikDatePicker;
