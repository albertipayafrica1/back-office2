import * as React from "react";
import PropTypes from "prop-types";

import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";

import { Field, ErrorMessage, getIn } from "formik";

import * as styles from "./styles";

const FormikRadioGroup = ({
  label,
  name,
  options,
  onChange,
  onBlur,
  row,
  required,
  disabled,
  externalStyles,
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
            {label !== "" && (
              <FormLabel id="radio-buttons-group-label" required={required}>
                {label}
              </FormLabel>
            )}

            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              row={row}
            >
              {options.map((option, index) => {
                return (
                  <FormControlLabel
                    value={option.value}
                    control={
                      <Radio
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={
                          onChange !== null ? onChange : form.handleChange
                        }
                        onBlur={onBlur !== null ? onBlur : form.handleBlur}
                        sx={styles.radio(externalStyles)}
                        key={index}
                        disabled={disabled}
                      />
                    }
                    label={
                      <Typography variant="subtitle3">{option.key}</Typography>
                    }
                  />
                );
              })}
            </RadioGroup>

            <FormHelperText sx={styles.helperText}>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

FormikRadioGroup.defaultProps = {
  onChange: null,
  onBlur: null,
  required: false,
  row: false,
  disabled: false,
  externalStyles: {},
};

FormikRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  row: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  externalStyles: PropTypes.shape({}),
};

export default FormikRadioGroup;
