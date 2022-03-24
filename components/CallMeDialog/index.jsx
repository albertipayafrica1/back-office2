import PropTypes from "prop-types";
import { useState } from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Formik, Form } from "formik";
import axios from "axios";
import Dialog from "../../atoms/Dialog/index";
import Marquee from "../../atoms/Marquee/index";
import FormikControl from "../FormikControls/index";
import { validationSchema } from "../../utils/formValidations/callme";
import MuiAlert from "../../atoms/MuiAlert";
import { styles } from "./styles";

const CallMeDialog = ({ open, handleToggleCallMeDemo }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [Loading, SetLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
  };

  const handleSubmit = (values, { setErrors }) => {
    setAlert(false);
    SetLoading(true);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/call-demo`,
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleToggleCallMeDemo}
        position={styles.dialogueContainer}
      >
        {alert ? (
          <MuiAlert
            variant="success"
            message="Thanks for your interest,iPay team will contact you"
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
                <Box sx={styles.CallMeContainer}>
                  <Typography>
                    Thanks for your interest. Ready for a Talk?
                  </Typography>
                  <Typography variant="title7">
                    Fill in the below details so that we can arrange for a talk
                  </Typography>
                  <Box>
                    <Box sx={styles.FormContainer}>
                      <Box sx={styles.leftInputs}>
                        <FormikControl
                          control="input"
                          label="Enter your first name"
                          name="firstName"
                          variant="outlined"
                          type="text"
                          id="firstName"
                          required
                        />
                      </Box>
                      <Box sx={styles.rightInputs}>
                        <FormikControl
                          control="input"
                          label="Enter your lastName"
                          name="lastName"
                          variant="outlined"
                          type="text"
                          id=" lastName"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={styles.TelephoneText}>
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

                  <Box sx={styles.textPrivacy}>
                    <Typography>
                      View our
                      <span>
                        {" "}
                        <Link
                          href="https://www.ipayafrica.com/info/privacy-policy"
                          passHref
                        >
                          <a style={styles.textTearms} target="_blank">
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
                    CALL ME
                  </LoadingButton>

                  <Typography variant="title8">
                    TRUSTED BY HUNDREDS OF ENTERPRISES WORLDWIDE
                  </Typography>
                  <Box sx={styles.MarqueeContainer}>
                    <Marquee />
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

export default CallMeDialog;

CallMeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleToggleCallMeDemo: PropTypes.func.isRequired,
};
