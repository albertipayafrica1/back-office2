import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Stack, Typography, Button } from "@mui/material";

import * as styles from "./styles";

const ResendOtp = ({ seconds, handleResendOtp }) => {
    const [counter, setCounter] = useState(seconds);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <Stack direction="row" alignItems="center">
            <Typography variant="body2">Didnt Receive OTP?</Typography>
            <Button
                sx={styles.resendOtpButton}
                onClick={handleResendOtp}
                disabled={counter > 0 ? true : false}
            >
                Resend OTP
            </Button>
            {counter > 0 && (
                <Typography variant="subtitle3" sx={styles.timer}>
                    {counter}
                    {" secs"}
                </Typography>
            )}
        </Stack>
    );
};

export default ResendOtp;

CreateAccountFormDiv.propTypes = {
    seconds: PropTypes.number.isRequired,
    handleResendOtp: PropTypes.func.isRequired,
};
