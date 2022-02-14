import { useState } from "react";

import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useStyles from "./styles";

const CustomInput = ({
    type,
    value,
    onChange,
    pClass,
    label,
    variant,
    name,
    haveTooltip,
    tooltipText,
    multiline,
    required,
    ...restProps
}) => {
    const [visibility, setVisibility] = useState(false);
    const classes = useStyles();

    const typeChangeHandler = () => {
        setVisibility((prev) => !prev);
    };

    return (
        <>
            <TextField
                label={label}
                id={label}
                variant={variant}
                className={[classes.input, pClass].join(" ")}
                type={
                    type !== "password"
                        ? type
                        : visibility
                        ? "text"
                        : "password"
                }
                onChange={onChange}
                value={value}
                name={name}
                size="medium"
                fullWidth
                multiline={multiline}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {type === "password" ? (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={typeChangeHandler}
                                >
                                    {visibility ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            ) : (
                                haveTooltip && (
                                    <Tooltip
                                        title={tooltipText}
                                        arrow
                                        className={classes.tooltip}
                                    >
                                        <IconButton>
                                            <InfoOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                )
                            )}
                        </InputAdornment>
                    ),
                }}
                {...restProps}
            />
        </>
    );
};

CustomInput.defaultProps = {
    pClass: "",
    tooltipText: "",
    haveTooltip: false,
    multiline: false,
    variant: "outlined",
    required: false,
};

CustomInput.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    haveTooltip: PropTypes.bool,
    tooltipText: PropTypes.string,
    multiline: PropTypes.bool,
    pClass: PropTypes.string,
    variant: PropTypes.string,
    required: PropTypes.bool,
};

export default CustomInput;
