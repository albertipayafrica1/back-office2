import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

import { Stack, Typography, Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import MuiAlert from "../../atoms/MuiAlert";
import ResendOtp from "../../atoms/ResendOtp";

import * as styles from "./styles";

const OTPInput = ({
  otp,
  error,
  loading,
  clearTimer,
  handleSubmit,
  handleChange,
  handleResendOtp,
  resendOtpSuccess,
}) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack direction="column" spacing={2} sx={styles.form}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src="/iPay-logo.svg" alt="iPay Logo" width={78} height={39} />

          <Typography variant="title6" sx={styles.otpText}>
            One Time Password (OTP) is sent to your email/mobile
          </Typography>
        </Stack>

        <Typography variant="title6">Enter OTP</Typography>
        <Typography variant="body2">
          An OTP has been sent to your email/mobile please verify it below
        </Typography>
        <Stack direction="row" spacing={3}>
          {otp.map((data, index) => (
            <input
              style={styles.otpField}
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
          ))}
        </Stack>
        <ResendOtp
          seconds={130}
          clearTimer={clearTimer}
          handleResendOtp={handleResendOtp}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          size="large"
          sx={styles.submitButton}
          onClick={handleSubmit}
          disabled={otp.join("").length !== 5}
        >
          Verify
        </LoadingButton>
        <Stack spacing={2} mt={4}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            mr={4}
          >
            <Typography variant="title6" mr={2}>
              Need help?
            </Typography>
            <Link href="/">
              <a>
                <Typography variant="title6" sx={styles.contactUs}>
                  Contact Us
                </Typography>
              </a>
            </Link>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mr={4}
          >
            <Typography variant="subtitle3">
              Authorised Payment Services Provider Regulated by the Central Bank
              of Kenya
            </Typography>
          </Stack>
        </Stack>

        {error && <MuiAlert variant="error" message={error} />}
        {resendOtpSuccess && (
          <MuiAlert variant="success" message="Otp has been resent!" />
        )}
      </Stack>
    </Box>
  );
};

OTPInput.propTypes = {
  otp: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  clearTimer: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.bool.isRequired,
  handleResendOtp: PropTypes.func.isRequired,
  resendOtpSuccess: PropTypes.bool.isRequired,
};

export default OTPInput;
