import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../FormikControls/index";

import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";
import ComplianceFormContainer from "../../../../atoms/CreateAccountFormDiv";

import { consent } from "./data";
import { compliance } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/compliance";

import { fetchKycStatusSuccess } from "../../../../redux";

import { styles } from "./styles";

const initialValues = {
  consent: [],
};

const ComplianceForm = ({ handleNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    console.log(values, "values");
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/consent-details`,
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
          dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
        formikHelpers.setSubmitting(false);
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
        formikHelpers.setSubmitting(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/consent-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setFormValues(response.data.response);
          setRetrievalLoading(false);
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setRetrievalLoading(false);
        }
      })
      .catch((error) => {
        setRetrievalLoading(false);

        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
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
        setRetrievalLoading(false);
      });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }

  return (
    <>
      <Stack sx={styles.topContainer} spacing={1}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={formValues || initialValues}
          validationSchema={compliance}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <ComplianceFormContainer topLabel="Data Processing Consent *">
                  <Box sx={styles.dataProcessingInnerContainer}>
                    <Typography variant="subtitle3">
                      I hereby agree and give consent as follows:
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      i. That iPay may collect, use, disclose and process my
                      personal information set out in my online application
                      form, account opening document and/or otherwise provided
                      by me or my authorized representative or prosed by iPay
                      for one or more of the purposes as stated in the iPay’s
                      Data Privacy Statement.
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      ii. My Personal data may/ will be disclosed by iPay
                      service providers or agents (including but not limited to
                      its auditors, lawyers/ law firms, partner banks) which may
                      be sited outside of Kenya, for one or more of the
                      purposes, as such third party service providers or agents,
                      if engaged by iPay, would be processing my personal data
                      for iPay for one or more of the purposes set out in that
                      Data Privacy Statement.
                    </Typography>
                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      iii. I am aware that I may withdraw my consent at any time
                      by using the iPay Consent Withdraw Form available in the
                      iPay Portal. iv. By submitting this online Form, I
                      represent and warrant that I am the user and / or
                      subscriber of the personal data as set out in my
                      application form and/or otherwise provided by me or my
                      authorized representative or possessed by iPay, and that I
                      have read and understood all of the above provisions,
                      including the Data Privacy Statement availed at
                      (iPayafrica.com)
                    </Typography>

                    <Typography
                      sx={styles.dataProcessingTitle}
                      variant="subtitle3"
                    >
                      v. I/We authorize iPay to process my/our sensitive
                      personal data both within and outside kenya, in accordance
                      with our Privacy Statement. vi. I/We authorize iPay to
                      process my/our personal data for analytics/ market
                      research or for marketing/advertising or for similar
                      commercial purposes in accordance with the Privacy
                      Statement.
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                      <FormikControl
                        control="checkbox"
                        name="consent"
                        options={consent}
                      />
                    </Box>
                  </Box>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Save and Next
                  </LoadingButton>
                </ComplianceFormContainer>
              </Form>
            );
          }}
        </Formik>
        <Box />
      </Stack>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

ComplianceForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default ComplianceForm;
