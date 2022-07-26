import { useState } from "react";
import PropTypes from "prop-types";

import {
  FormControl,
  FormHelperText,
  Checkbox,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemText,
} from "@mui/material";

import { Field, ErrorMessage, getIn } from "formik";

import {
  useStyles,
  useOutlinedInputStyles,
  checkBoxStyle,
  selectStyle,
} from "./styles";

const FormikMultiSelect = ({
  label,
  selectOptions,
  name,
  onChange,
  onBlur,
  required,
}) => {
  const outlinedInputClasses = useOutlinedInputStyles();
  const classes = useStyles();

  const [focused, setFocused] = useState(false);

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
              <InputLabel
                required={required}
                className={
                  (field?.value?.length <= 0 && !focused) ||
                  (Boolean(
                    getIn(form.touched, name) && getIn(form.errors, name)
                  ) &&
                    !focused)
                    ? classes.inputLabelNoShrink
                    : classes.inputLabelShrink
                }
              >
                {label}
              </InputLabel>
            )}
            <Select
              {...field}
              onChange={onChange !== null ? onChange : form.handleChange}
              onBlur={
                onBlur !== null
                  ? onBlur
                  : (e) => {
                      setFocused(false);
                      return form.handleBlur(e);
                    }
              }
              onFocus={() => setFocused(true)}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              sx={selectStyle}
              input={
                <OutlinedInput label={label} classes={outlinedInputClasses} />
              }
              renderValue={(selected) => selected.join(", ")}
              //   MenuProps={MenuProps}
            >
              {selectOptions.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                  <Checkbox
                    checked={field.value.indexOf(option.value) > -1}
                    sx={checkBoxStyle}
                  />
                  <ListItemText primary={option.key} />
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

FormikMultiSelect.defaultProps = {
  label: "",
  onChange: null,
  onBlur: null,
  required: false,
};

FormikMultiSelect.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default FormikMultiSelect;
