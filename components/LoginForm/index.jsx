import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

import { Stack, Box, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import CustomInput from "../../atoms/CustomInput";
import MuiAlert from "../../atoms/MuiAlert";

import * as styles from "./styles";

const LoginForm = ({
  handleSubmit,
  loading,
  formData,
  handleFormChange,
  errors,
}) => {
  return (
    <Box sx={styles.formContainer}>
      <Stack component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src="/iPay-logo.svg" alt="iPay Logo" width={78} height={39} />

          <Typography variant="title6" sx={styles.otp}>
            One Time Password (OTP) will be sent to your mobile
          </Typography>
        </Stack>

        <Typography variant="title6">Login</Typography>

        <CustomInput
          variant="outlined"
          id="email"
          type="email"
          label="Your Email"
          name="email"
          autoFocus
          error={!!errors.email}
          helperText={errors.email}
          value={formData.email}
          onChange={handleFormChange}
          sx={styles.textField}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          mr={4}
        >
          <Link href="/">
            <a>
              <Typography variant="subtitle2" sx={styles.blueText}>
                Forgot Password?
              </Typography>
            </a>
          </Link>
        </Stack>
        <CustomInput
          variant="outlined"
          name="password"
          label="Password"
          type="password"
          id="password"
          error={!!errors.password}
          helperText={errors.password}
          value={formData.password}
          onChange={handleFormChange}
          sx={styles.textField}
        />
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          size="large"
          sx={styles.submitButton}
          onClick={handleSubmit}
        >
          Log In
        </LoadingButton>
        <Stack spacing={2} mt={4}>
          <Link href="/createAccount">
            <a>
              <Typography variant="title6" sx={styles.blueText}>
                Dont have iPay Merchant account? Register here.
              </Typography>
            </a>
          </Link>
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
      </Stack>
      {errors.generic !== "" && errors.generic && (
        <MuiAlert variant="error" message={errors.generic} />
      )}
    </Box>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    generic: PropTypes.string,
  }).isRequired,
};
export default LoginForm;
