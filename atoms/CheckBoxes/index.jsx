import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Typography,
} from "@mui/material";

import * as styles from "./styles";

const CheckboxesGroup = ({
  label,
  formFields,
  onChange,
  helperText,
  fieldChecked,
  fieldName,
}) => {
  // const error = [].filter((v) => v).length !== 2;
  const error = null;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        variant="standard"
      >
        {label !== "" && <FormLabel component="legend"> {label} </FormLabel>}
        <FormGroup>
          {formFields.map((field) => (
            <FormControlLabel
              key={field.value}
              control={
                <Checkbox
                  checked={!!fieldChecked.includes(field.value)}
                  onChange={onChange}
                  name={fieldName}
                  value={field.value}
                  sx={styles.checkbox}
                />
              }
              label={<Typography variant="subtitle3">{field.key}</Typography>}
            />
          ))}
        </FormGroup>
        <FormHelperText sx={styles.helperText}>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
};

CheckboxesGroup.defaultProps = {
  helperText: "",
  label: "",
};

CheckboxesGroup.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  formFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldChecked: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CheckboxesGroup;
