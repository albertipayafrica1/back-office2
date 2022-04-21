import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

import * as React from "react";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
  Autocomplete,
  Box,
} from "@mui/material";

import { FastField, ErrorMessage, getIn } from "formik";
import useStyles from "./styles";

// just commented for reference
// const Autocomplete = styled(MuiAutocomplete)({
//   ".MuiAutocomplete-inputRoot": {
//     height: "40px",
//     borderRadius: "7px",

//     "& .MuiInputAdornment-root": {
//       height: "20px",
//     },
//     // "& .MuiOutlinedInput-notchedOutline": {
//     //   borderWidth: "2px",
//     //   borderColor: "blue",
//     // },
//     // "&:hover .MuiOutlinedInput-notchedOutline": {
//     //   borderWidth: "2px",
//     //   borderColor: "blue",
//     // },
//     // "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//     //   borderWidth: "2px",
//     //   borderColor: "blue",
//     //},
//   },
// });

const FormikAutoComplete = ({
  name,
  onChange,
  options,
  defaultValue,
  use,
  onBlur,
  required,
  label,
  ...restProps
}) => {
  console.log(options);
  const classes = useStyles();

  return (
    <FastField name={name}>
      {({ field, form }) => {
        console.log(form, "form");
        console.log(field, "field");
        return (
          <FormControl
            error={Boolean(
              getIn(form.touched, name) && getIn(form.errors, name)
            )}
          >
            <FormGroup>
              <Autocomplete
                {...restProps}
                defaultValue={{ value: "KE", label: "Kenya", key: "254" }}
                disableClearable
                id={name}
                name={name}
                options={options}
                onChange={
                  onChange !== ""
                    ? onChange
                    : (e, value) => {
                        form.setFieldValue(
                          name,
                          value !== null ? value.value : ""
                        );
                      }
                }
                onBlur={form.handleBlur}
                autoHighlight
                getOptionLabel={(option) => option.key}
                InputProps={{
                  classes: { root: classes.root },
                }}
                sx={{
                  ".MuiAutocomplete-inputRoot": {
                    height: "40px",
                    borderRadius: "7px",
                    width: "100%",
                    "& .MuiAutocomplete-input": {
                      padding: "3px 4px 7.5px 6px",
                    },
                  },
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {use === "telephoneCountryCode" && (
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    )}
                    {option.key}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={name}
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
                    InputProps={{
                      ...params.InputProps,
                      classes: { root: classes.root },
                    }}
                    required={required}
                    InputLabelProps={{
                      shrink: true,
                      // className:
                      //   field !== undefined &&
                      //   field.value !== undefined &&
                      //   field.value !== null &&
                      //   field.value.length <= 0
                      //     ? classes.inputLabelNoShrink
                      //     : undefined,
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
                      // ".MuiAutocomplete-inputRoot": {
                      //   height: "40px",
                      //   borderRadius: "7px",
                      // },
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
            </FormGroup>
            <FormHelperText>
              <ErrorMessage name={name} />
            </FormHelperText>
          </FormControl>
        );
      }}
    </FastField>
  );
};

FormikAutoComplete.defaultProps = {
  onChange: "",
  onBlur: "",
  use: "",
  defaultValue: {},
};

FormikAutoComplete.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  defaultValue: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  }),
  use: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FormikAutoComplete;
