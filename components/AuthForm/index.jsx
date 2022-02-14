import Image from "next/image";
import Link from "next/link";

import { Alert, Stack, Box, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import useForm from "../../hooks/useForm";

import CustomInput from "../../atoms/CustomInput";

import * as styles from "./styles";

const AuthForm = () => {
  const [formData, handleFormChange] = useForm({
    email: "",
    password: "",
    showPassword: false,
  });

  const error = null;
  const loading = false;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            One Time Password (OTP) will be sent to your email
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
          value={formData.email}
          onChange={handleFormChange}
          sx={styles.textField}
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ mr: 4 }}
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
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Link href="/">
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
            sx={{ mr: 4 }}
          >
            <Typography variant="title6" sx={{ mr: 2 }}>
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
            sx={{ mr: 4 }}
          >
            <Typography variant="subtitle3">
              Authorised Payment Services Provider Regulated by the Central Bank
              of Kenya
            </Typography>
          </Stack>
        </Stack>

        {error && (
          <Alert severity="error" sx={styles.alert}>
            {error.message}
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default AuthForm;
