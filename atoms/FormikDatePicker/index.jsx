import PropTypes from "prop-types";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";

import { Field, ErrorMessage, getIn } from "formik";

const FormikDatePicker = ({
  name,
  onChange,
  onBlur,
  required,
  label,
  ...restProps
}) => {
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
                  label={label}
                  inputFormat="dd/MM/yyyy"
                  required={required}
                  onChange={onChange !== "" ? onChange : form.handleChange}
                  onBlur={onBlur !== "" ? onBlur : form.handleBlur}
                  renderInput={(params) => <TextField {...params} />}
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
