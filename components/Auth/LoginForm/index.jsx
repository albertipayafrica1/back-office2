import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import MuiAlert from "../../../atoms/MuiAlert";

import {
  getCountryIconLink,
  countryOfOperationBank,
} from "../../../utils/countryOfOperation";
import { login } from "../../../utils/formValidations/login";

import * as styles from "./styles";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = ({ country }) => {
  const router = useRouter();
  const { query } = router;

  const [countryIconLink, setCountryIconLink] = useState(
    "https://icons.elipa.co/iPay_newlogo.svg"
  );
  const [countryRegulator, setCountryRegulator] = useState("Kenya");
  const [flashMessage, setFlashMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          Cookies.set("iPayT", response.data.token, {
            secure: true,
          });
          router.replace(`/auth/otp?country=${country}`);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          setAlert({ type: "error", message: error.response.data.response });
        } else if (error.response) {
          if (error.response.data.response !== undefined) {
            setAlert({
              type: "error",
              message: error.response.data.response,
            });
          } else {
            setAlert({ type: "error", message: error.response.data.response });
          }
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const timer = sessionStorage.getItem("timer");
    if (timer !== null || timer !== undefined) {
      sessionStorage.removeItem("timer");
    }
    setCountryIconLink(getCountryIconLink(query.country));
    setCountryRegulator(countryOfOperationBank(query.country));
    if (query.status === "newAccountCreated") {
      setFlashMessage(true);
      setTimeout(() => {
        setFlashMessage(false);
      }, 3000);
    }
  }, []);

  return (
    <Box sx={styles.formContainer}>
      <Stack sx={styles.form}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Image src={countryIconLink} alt="Logo" width={78} height={39} />
          {flashMessage && (
            <Typography variant="title5" sx={styles.flashMessage}>
              Your Account is created, kindly verify your email to login
            </Typography>
          )}
        </Stack>

        <Typography variant="title6">Login</Typography>

        <Formik
          validationSchema={login}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control="input"
                  label="Email"
                  name="email"
                  variant="outlined"
                  type="text"
                  id="email"
                  required
                  sx={styles.textField}
                />
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mb={1}
                >
                  <Link
                    href={`/auth/resetPasswordRequest?country=${query.country}`}
                  >
                    <a style={styles.forgotPassword}>
                      <Typography variant="subtitle2" sx={styles.blueText}>
                        Forgot Password?
                      </Typography>
                    </a>
                  </Link>
                </Stack>
                <FormikControl
                  control="input"
                  label="Password"
                  name="password"
                  variant="outlined"
                  type="password"
                  id="password"
                  required
                  sx={styles.textField}
                  fastField={false}
                />
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid}
                >
                  Log In
                </LoadingButton>
              </Form>
            );
          }}
        </Formik>
        <Stack spacing={2} mt={4}>
          <Link
            href={`/auth/createAccount?country=${query.country}&rc=RC000000`}
          >
            <a>
              <Typography variant="title6" sx={styles.blueText}>
                Don&apos;t have an account? Register here.
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
              Authorised Payment Services Provider Regulated By{" "}
              {countryRegulator}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </Box>
  );
};

LoginForm.propTypes = {
  country: PropTypes.string.isRequired,
};
export default LoginForm;
