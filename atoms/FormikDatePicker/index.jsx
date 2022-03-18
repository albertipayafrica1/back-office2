import PropTypes from "prop-types";

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";

// import DateAdapter from "@mui/lab/AdapterMoment";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";

import { Field } from "formik";

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
          <FormControl error={!!form.errors[name]}>
            <FormGroup>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  {...field}
                  {...restProps}
                  label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  required={required}
                  onChange={onChange !== "" ? onChange : form.handleChange}
                  onBlur={onBlur !== "" ? onBlur : form.handleBlur}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormGroup>
            <FormHelperText>
              {form.errors[name] ? form.errors[name] : ""}
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
