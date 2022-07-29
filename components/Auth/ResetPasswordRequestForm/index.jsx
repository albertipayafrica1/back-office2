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
import { resetPasswordRequest } from "../../../utils/formValidations/resetPasswordRequest";

import * as styles from "./styles";

const initialValues = {
  email: "",
};

const ResetPasswordRequestForm = () => {
  const router = useRouter();
  const { query } = router;

  const [countryIconLink, setCountryIconLink] = useState(
    "https://icons.elipa.co/iPay_newlogo.svg"
  );
  const [countryRegulator, setCountryRegulator] = useState("Kenya");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    setCountryIconLink(getCountryIconLink(query.country));
    setCountryRegulator(countryOfOperationBank(query.country));
  }, []);

  const handleSubmit = (values) => {
    setLoading(true);
    setAlert({ type: "", message: "" });

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`,
      headers: { "Content-Type": "application/json" },
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

        <Typography variant="title6">Reset Request</Typography>

        <Formik
          validationSchema={resetPasswordRequest}
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

                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid}
                >
                  Request Reset
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

export default ResetPasswordRequestForm;
