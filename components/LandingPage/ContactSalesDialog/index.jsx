import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import axios from "axios";
import Dialog from "../../../atoms/Dialog";
import Marquee from "../../../atoms/Marquee";
import FormikControl from "../../FormikControls/index";
import { validationSchema } from "../../../utils/formValidations/contactSales";
import MuiAlert from "../../../atoms/MuiAlert";
import { iPayProducts } from "./data";
import { styles } from "./styles";

const ContactSales = ({ toggleSales, open }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    setAlert(false);
    setError(false);
  }, [open]);

  const handleSubmit = (values, { setErrors }) => {
    setAlert(false);
    SetLoading(true);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-sales`,
      headers: {
        "Content-Type": "application/json",
        "Device-Channel": "web",
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        if (response.data.success) {
          setResponseMessage(response.data.response);
          setError(false);
          setAlert(true);
          SetLoading(false);
        }
      })
      .catch((errors) => {
        setError(false);
        setError(true);
        if (error.response) {
          if (errors.response.data.responseCode === 400) {
            setErrors(errors.response.data.response);
            setError(true);
            SetLoading(false);
          }
        }
        SetLoading(false);
      });
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    yourCompanyName: "",
    yourCompanyWebsite: "",
    mobileNumber: "",
    email: "",
    subject: "",
    solution: [],
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleSales}
        position={styles.dialogueContainer}
        hasCloseIcon
      >
        {alert ? (
          <MuiAlert variant="success" message={responseMessage} />
        ) : null}

        {error ? (
          <MuiAlert variant="error" message="kindly resolve form errors" />
        ) : null}

        {error ? (
          <MuiAlert
            variant="error"
            message="Something went wrong please try again"
          />
        ) : null}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Box sx={styles.BookDemoContainer}>
                  <Typography sx={styles.salesText}>
                    Contact our Sales team.
                  </Typography>
                  <Typography sx={styles.salesDescription}>
                    With iPay you can Sell online, process payments, build
                    financial products, or use business tools designed to grow
                    your business. Please complete the form below to connect
                    with a member of our team.
                  </Typography>
                  <Box>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      sx={{ mt: "10px" }}
                      spacing={2}
                    >
                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="First name"
                          name="firstName"
                          variant="outlined"
                          type="text"
                          id="firstname"
                          required
                        />
                      </Box>

                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="Last name"
                          name="lastName"
                          variant="outlined"
                          type="text"
                          id="lastName"
                          required
                        />
                      </Box>
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{ mt: "5px" }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="Company name"
                          name="yourCompanyName"
                          variant="outlined"
                          type="text"
                          id="firstname"
                        />
                      </Box>

                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="You company website"
                          name="yourCompanyWebsite"
                          variant="outlined"
                          type="text"
                          id="yourCompanyWebsite"
                        />
                      </Box>
                    </Stack>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{ mt: "5px" }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="Mobile number"
                          name="mobileNumber"
                          variant="outlined"
                          type="text"
                          id="mobileNumber"
                          required
                        />
                      </Box>

                      <Box sx={{ width: "100%" }}>
                        <FormikControl
                          control="input"
                          label="Email"
                          name="email"
                          variant="outlined"
                          type="email"
                          id="email"
                          required
                        />
                      </Box>
                    </Stack>
                  </Box>
                  <Box>
                    <Box>
                      <Box sx={styles.subject}>
                        <FormikControl
                          control="input"
                          label="How can we help you?"
                          name="subject"
                          variant="outlined"
                          type="text"
                          id="subject"
                          required
                        />
                      </Box>
                      <Box sx={{ marginTop: "5px" }}>
                        What solution are you interested in?
                      </Box>
                    </Box>

                    <Box sx={styles.checkbtnContainer}>
                      <Box>
                        <FormikControl
                          control="checkbox"
                          options={iPayProducts}
                          name="solution"
                        />
                      </Box>
                    </Box>
                    <Typography style={styles.title4}>
                      By submitting this form you agree to our
                      <span>
                        {" "}
                        <Link
                          href="https://www.ipayafrica.com/info/privacy-policy"
                          passHref
                        >
                          <a style={styles.Textpolicy} target="_blank">
                            {" "}
                            terms & privacy policy{" "}
                          </a>
                        </Link>
                      </span>
                    </Typography>
                  </Box>

                  <LoadingButton
                    loading={Loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                  >
                    Send message
                  </LoadingButton>
                  <Typography sx={styles.textTrusted} variant="title8">
                    TRUSTED BY HUNDREDS OF ENTERPRISES WORLDWIDE
                  </Typography>
                </Box>
              </Form>
            );
          }}
        </Formik>
        <Box sx={styles.MarqueeContainer}>
          <Marquee />
        </Box>
      </Dialog>
    </div>
  );
};

export default ContactSales;
ContactSales.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleSales: PropTypes.func.isRequired,
};
