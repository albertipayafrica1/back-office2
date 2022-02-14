import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Alert, Box } from "@mui/material";

import * as styles from "./styles";

const MuiAlert = ({ variant, message }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <Box sx={styles.AlertContainer}>
            {show && (
                <Alert variant="filled" severity={variant}>
                    {message}
                </Alert>
            )}
        </Box>
    );
};

MuiAlert.defaultProps = {
    variant: "info",
};

MuiAlert.propTypes = {
    variant: PropTypes.string,
    message: PropTypes.string.isRequired,
};

export default MuiAlert;
