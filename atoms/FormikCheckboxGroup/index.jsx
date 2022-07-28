import PropTypes from "prop-types";

import {
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Typography,
} from "@mui/material";

import { Field, ErrorMessage, getIn } from "formik";

import * as styles from "./styles";

const FormikCheckboxGroup = ({
  label,
  options,
  name,
  onChange,
  onBlur,
  required,
  row,
  disabled,
}) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
          >
            {label !== "" && <FormLabel required={required}>{label}</FormLabel>}
            <FormGroup
              aria-labelledby="checkbox-group-label"
              name="checkbox-group"
              row={row}
            >
              {options.map((option) => {
                return (
                  <FormControlLabel
                    value={option.value}
                    control={
                      <Checkbox
                        id={option.value}
                        key={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value.includes(option.value)}
                        onChange={
                          onChange !== null ? onChange : form.handleChange
                        }
                        onBlur={onBlur !== null ? onBlur : form.handleBlur}
                        sx={styles.checkbox}
                        disabled={disabled}
                      />
                    }
                    label={
                      <Typography variant="subtitle3">{option.key}</Typography>
                    }
                  />
                );
              })}
            </FormGroup>
            <FormHelperText sx={styles.helperText}>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

FormikCheckboxGroup.defaultProps = {
  helperText: "",
  label: "",
  onChange: null,
  onBlur: null,
  required: false,
  row: false,
  disabled: false,
};

FormikCheckboxGroup.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  helperText: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  row: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default FormikCheckboxGroup;
