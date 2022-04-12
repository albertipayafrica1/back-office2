import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import axios from "axios";
import Dialog from "../../atoms/Dialog/index";
import Marquee from "../../atoms/Marquee/index";
import FormikControl from "../FormikControls/index";
import { validationSchema } from "../../utils/formValidations/ContactSales";
import MuiAlert from "../../atoms/MuiAlert";
import { iPayProducts } from "./data";
import { styles } from "./styles";

const ContactSales = ({ toggleSales, open }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    setAlert(false);
    setError(false);
  }, [open]);

  const handleSubmit = (values, { setErrors }) => {
    setAlert(false);
    SetLoading(true);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-demo`,
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success) {
          setAlert(true);
          SetLoading(false);
        }
      })
      .catch((errors) => {
        if (error.response) {
          if (errors.response.data.responseCode === 400) {
            setErrors(errors.response.data.response);
            setError(true);
            SetLoading(false);
          }
        }
        setError(true);
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
      >
        {alert ? (
          <MuiAlert
            variant="success"
            message="Demo booked succesfuly ipay team will contact you"
          />
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
                  <Typography>
                    With iPay you can Sell online, process payments, build
                    financial products, or use business tools designed to grow
                    your business. Please complete the form below to connect
                    with a member of our team.
                  </Typography>
                  <Box sx={styles.FormContainer}>
                    <Box>
                      <Box sx={styles.inputsContainer}>
                        <FormikControl
                          control="input"
                          label="FirstName"
                          name="firstName"
                          variant="outlined"
                          type="text"
                          id="firstname"
                          required
                        />
                      </Box>
                      <Box sx={styles.leftFormContainer}>
                        <FormikControl
                          control="input"
                          label="Enter Your Company Name"
                          name="yourCompanyName"
                          variant="outlined"
                          type="text"
                          id="firstname"
                        />
                      </Box>
                      <Box sx={styles.leftFormContainer}>
                        <FormikControl
                          control="input"
                          label="Enter your mobile number"
                          name="mobileNumber"
                          variant="outlined"
                          type="text"
                          id="mobileNumber"
                          required
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Box sx={styles.LastnameForm}>
                        <FormikControl
                          control="input"
                          label="Enter your  lastname"
                          name="lastName"
                          variant="outlined"
                          type="text"
                          id="lastName"
                          required
                        />
                      </Box>
                      <Box sx={styles.rightFormContainer}>
                        <FormikControl
                          control="input"
                          label="Enter your company website"
                          name="yourCompanyWebsite"
                          variant="outlined"
                          type="text"
                          id="yourCompanyWebsite"
                        />
                      </Box>
                      <Box sx={styles.rightFormContainer}>
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
                    </Box>
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
                      <Box sx={{ marginTop: "10px" }}>
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
