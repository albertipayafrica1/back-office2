import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { Stack, Box, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import MuiAlert from "../../../atoms/MuiAlert";

import {
  getCountryIconLink,
  countryOfOperationBank,
} from "../../../utils/countryOfOperation";
import { resetPassword } from "../../../utils/formValidations/resetPassword";

import * as styles from "./styles";

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const router = useRouter();
  const { query } = router;

  const [countryIconLink, setCountryIconLink] = useState(
    "https://icons.elipa.co/iPay_newlogo.svg"
  );
  const [countryRegulator, setCountryRegulator] = useState("Kenya");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/set-password`,
      headers: {
        "Content-Type": "application/json",
        "Device-Channel": "web",
        Authorization: `Bearer ${query.token}`,
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: response.data.response,
          });
          setLoading(false);
          router.replace(`/auth/login?country=${query.country}`);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        } else if (error.response.status === 406) {
          formikHelpers.setErrors({ ...error.response.data.response });
          setAlert({ type: "error", message: "Kindly Resolve Form Errors" });
        } else if (error.response) {
          if (error.response.data.response !== undefined) {
            setAlert({
              type: "error",
              message: error.response.data.response,
            });
          } else {
            setAlert({
              type: "error",
              message: "Something Went Wrong",
            });
          }
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setCountryIconLink(getCountryIconLink(query.country));
    setCountryRegulator(countryOfOperationBank(query.country));
  }, []);

  return (
    <Box sx={styles.formContainer}>
      <Stack sx={styles.form}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src={countryIconLink} alt="Logo" width={78} height={39} />
        </Stack>

        <Typography variant="title6">Reset Password</Typography>
        <Formik
          validationSchema={resetPassword}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack spacing={2}>
                  <FormikControl
                    control="input"
                    label="New Password"
                    name="newPassword"
                    variant="outlined"
                    type="password"
                    id="newPassword"
                    required
                    sx={styles.textField}
                    fastField={false}
                  />
                  <FormikControl
                    control="input"
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    type="password"
                    id="confirmPassword"
                    required
                    sx={styles.textField}
                    fastField={false}
                  />
                </Stack>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                >
                  Reset Password
                </LoadingButton>
              </Form>
            );
          }}
        </Formik>
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

export default ResetPasswordForm;
