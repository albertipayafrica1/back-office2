import { useState } from "react";
import Image from "next/image";
import Link from "next/Link";

import { Stack, Typography, Button, Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import MuiAlert from "../../atoms/MuiAlert";

import * as styles from "./styles";

const OTPInput = () => {
    const [otp, setOtp] = useState(new Array(5).fill(""));
    const error = true;
    const loading = false;

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.value === "" && element.previousSibling) {
            return element.previousSibling.focus();
        } else if (element.value === "" && !element.previousSibling) {
            return;
        } else if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const joinedOtp = otp.join("");
        console.log(joinedOtp);
    };

    const handleResendOtp = () => {};

    return (
        <Box sx={styles.formContainer}>
            <Stack direction="column" spacing={2} sx={styles.form}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Image
                        src="/iPay-logo.svg"
                        alt="iPay Logo"
                        width={78}
                        height={39}
                    />

                    <Typography variant="title6" sx={styles.otp}>
                        One Time Password (OTP) is sent to your email
                    </Typography>
                </Stack>

                <Typography variant="title6">Enter OTP</Typography>
                <Typography variant="body2">
                    An OTP has been sent to your email please verify it below
                </Typography>
                <Stack direction="row" spacing={3}>
                    {otp.map((data, index) => {
                        return (
                            <input
                                style={{
                                    maxWidth: "3rem",
                                    height: "3.5rem",
                                    fontSize: "2rem",
                                    borderRadius: "0.5rem",
                                    borderColor: "gray",
                                }}
                                onPaste="return false;"
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                            />
                        );
                    })}
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Typography variant="body2">Didnt Receive OTP?</Typography>
                    <Button sx={{ color: "#124AA1" }} onClick={handleResendOtp}>
                        Resend OTP
                    </Button>
                </Stack>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={otp.join("").length === 5 ? false : true}
                >
                    Verify
                </LoadingButton>
                <Stack spacing={2} sx={{ mt: 4 }}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        sx={{ mr: 4 }}
                    >
                        <Typography variant="title6" sx={{ mr: 2 }}>
                            Need help?
                        </Typography>
                        <Link href="/">
                            <a>
                                <Typography
                                    variant="title6"
                                    sx={styles.contactUs}
                                >
                                    Contact Us
                                </Typography>
                            </a>
                        </Link>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mr: 4 }}
                    >
                        <Typography variant="subtitle3">
                            Authorised Payment Services Provider Regulated by
                            the Central Bank of Kenya
                        </Typography>
                    </Stack>
                </Stack>

                {error && <MuiAlert variant="success" message="Success" />}
            </Stack>
        </Box>
    );
};

export default OTPInput;
