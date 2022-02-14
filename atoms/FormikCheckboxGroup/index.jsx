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

const FormikCheckboxGroup = ({ label, options, name, onChange, onBlur }) => {
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
          >
            {label !== "" && <FormLabel>{label}</FormLabel>}
            {options.map((option) => {
              return (
                <FormGroup>
                  <FormControlLabel
                    value={option.value}
                    control={
                      <Checkbox
                        id={option.value}
                        {...field}
                        value={option.value}
                        checked={field.value.includes(option.value)}
                        onChange={
                          onChange !== "" ? onChange : form.handleChange
                        }
                        onBlur={onBlur !== "" ? onBlur : form.handleBlur}
                        sx={styles.checkbox}
                      />
                    }
                    label={
                      <Typography variant="subtitle3">{option.key}</Typography>
                    }
                  />
                </FormGroup>
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

FormikCheckboxGroup.defaultProps = {
  helperText: "",
  label: "",
  onChange: "",
  onBlur: "",
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
};

export default FormikCheckboxGroup;
