import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";

import { businessSupportDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessSupportDetails";

import * as styles from "./styles";

const initialValues = {
  customerSupportTelephoneNumber: "",
  customerSupportAddress: "",
  customerSupportEmailAddress: "",
};

const BusinessSupportDetailsForm = ({ handleNextStep }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/support-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Bank Details Updated Successfully!",
          });
          handleNextStep();
          setLoading(false);
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
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
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error, "third if else");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const savedValues = {
      // this you get it from api call
      customerSupportTelephoneNumber: "567890",
      customerSupportAddress: "sdadsad",
      customerSupportEmailAddress: "dsadsa@dajjjjjj.com",
    };
    setFormValues(savedValues);
  }, []);

  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={businessSupportDetails}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Stack sx={styles.formContainer} spacing={8}>
                <Typography variant="subtitle1">
                  This information helps customers recognize your business. Your
                  support information may be visible in payment statements,
                  involves and receipts
                </Typography>
                <CreateAccountFormDiv topLabel="Business Support Details">
                  <Stack direction="column" spacing={2}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="customerSupportTelephoneNumber"
                      label="Customer Support Telephone Number"
                      type="number"
                      id="customerSupportTelephoneNumberb"
                      required
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="customerSupportAddress"
                      label="Customer Support Address"
                      type="text"
                      id="customerSupportAddress"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Customer Support Email Address"
                      name="customerSupportEmailAddress"
                      variant="outlined"
                      type="text"
                      id="customerSupportEmailAddress"
                      required
                    />
                  </Stack>
                </CreateAccountFormDiv>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.saveAndNextButton}
                  disabled={!formik.isValid}
                >
                  Save & Next
                </LoadingButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

BusinessSupportDetailsForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BusinessSupportDetailsForm;
