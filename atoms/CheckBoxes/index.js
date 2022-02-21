import PropTypes from "prop-types";
import {
    Box,
    FormControl,
    FormGroup,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    Checkbox,
} from "@mui/material";

export default function CheckboxesGroup({
    label,
    formFields,
    onChange,
    helperText,
    fieldChecked,
    fieldName,
}) {
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
                {label !== "" && (
                    <FormLabel component="legend"> {label} </FormLabel>
                )}
                <FormGroup>
                    {formFields.map((field) => (
                        <FormControlLabel
                            key={field}
                            control={
                                <Checkbox
                                    checked={
                                        fieldChecked.includes(field)
                                            ? true
                                            : false
                                    }
                                    onChange={onChange}
                                    name={fieldName}
                                    value={field}
                                />
                            }
                            label={field}
                        />
                    ))}
                </FormGroup>
                <FormHelperText> {helperText} </FormHelperText>
            </FormControl>
        </Box>
    );
}

CheckboxesGroup.defaultProps = {
    pClass: "",
    tooltipText: "",
    haveTooltip: false,
    required: false,
    error: false,
    helperText: "",
    select: false,
    selectItem: [],
    label: "",
};

CheckboxesGroup.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    haveTooltip: PropTypes.bool,
    tooltipText: PropTypes.string,
    pClass: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    formFields: PropTypes.array.isRequired,
    fieldName: PropTypes.string.isRequired,
    fieldChecked: PropTypes.array.isRequired,
};
