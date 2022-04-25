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
            {options.map((option) => {
              return (
                <RadioGroup
                  aria-labelledby="radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                >
                  <FormControlLabel
                    value={option.value}
                    control={
                      <Radio
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={
                          onChange !== "" ? onChange : form.handleChange
                        }
                        onBlur={onBlur !== "" ? onBlur : form.handleBlur}
                        sx={styles.radio}
                      />
                    }
                    label={
                      <Typography variant="subtitle3">{option.key}</Typography>
                    }
                  />
                </RadioGroup>
              );
            })}
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
  onChange: "",
  onBlur: "",
  required: false,
};

FormikRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  row: PropTypes.bool.isRequired,
  required: PropTypes.bool,
};

export default FormikRadioGroup;
