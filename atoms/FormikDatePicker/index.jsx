import PropTypes from "prop-types";

import {
  DesktopDatePicker,
  LocalizationProvider,
  AdapterMoment,
} from "@mui/lab";

import DateAdapter from "@mui/lab/AdapterMoment";

import { TextField } from "@mui/material";

import { Field, ErrorMessage } from "formik";

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
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
              {...field}
              {...restProps}
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              required={required}
              onChange={onChange !== "" ? onChange : form.handleChange}
              onBlur={onBlur !== "" ? onBlur : form.handleBlur}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
