import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Stack, Box, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import axios from "axios";
import CustomInput from "../../atoms/CustomInput";
import MuiAlert from "../../atoms/MuiAlert";

import { getCountryIconLink } from "../../utils/countryOfOperation";

import * as styles from "./styles";

const LoginForm = ({
  handleSubmit,
  loading,
  formData,
  handleFormChange,
  errors,
}) => {
  const router = useRouter();
  const { query } = router;

  const [countryIconLink, setCountryIconLink] = useState(
    "https://icons.elipa.co/iPay_newlogo.svg"
  );
  const [flashMessage, setFlashMessage] = useState(false);

  useEffect(() => {
    const timer = sessionStorage.getItem("timer");
    if (timer !== null || timer !== undefined) {
      sessionStorage.removeItem("timer");
    }
    setCountryIconLink(getCountryIconLink(query.country));
    if (query.status === "newAccountCreated") {
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 3000);
    }
  }, []);

  return (
    <Box sx={styles.formContainer}>
      <Stack component="form" sx={styles.form} onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Image src={countryIconLink} alt="Logo" width={78} height={39} />
          {flashMessage && (
            <Typography variant="title6" sx={styles.flashMessage}>
              Your Account has been created, kindly verify your email to login
            </Typography>
          )}
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
          <Link href={`/resetPasswordRequest?country=${query.country}`}>
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
          <Link href={`/createAccount?country=${query.country}&rc=RC0000`}>
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
