import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";

import FormikControl from "../../../FormikControls/index";
import { ComplianceResponse, consent } from "./data";
import DownloadDiv from "../../../../atoms/DownloadDiv";
import ComplianceFormContainer from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";

import { compliance } from "../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/compliance";

import { fetchKycStatusSuccess } from "../../../../redux";

import { styles } from "./styles";

const initialValues = {
  resident: "",
  citizen: "",
  greenCard: "",
  born: "",
  powerAuthority: "",
  address: "",
  mailAddress: "",
  bankAccount: "",
  telephone: "",
  fatcaStatus: "",
  explanation: [],
  W8Form: [],
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
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/compliance`,
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/compliance`,
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
    setFormValues({
      // this you get it from api call
      resident: "",
      citizen: "",
      greenCard: "",
      born: "",
      powerAuthority: "",
      address: "",
      mailAddress: "",
      bankAccount: "",
      telephone: "",
      fatcaStatus: "",
      explanation: [],
      W8Form: [],
      consent: [],
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
            // console.log(formik.errors, "for");
            return (
              <Form>
                <ComplianceFormContainer topLabel="Foreign Account Tax Compliance Act (FATCA)">
                  <Box sx={styles.innerContainer}>
                    <Box sx={styles.radioButtonContainer}>
                      <FormikControl
                        control="radio"
                        label="1. Are you a U.S citizen?"
                        name="citizen"
                        options={ComplianceResponse}
                        required
                        onChange={(e) => {
                          formik.setFieldValue("citizen", e.target.value);
                          if (e.target.value === "2") {
                            formik.setFieldValue("resident", "");
                            formik.setFieldValue("greenCard", "");
                            formik.setFieldValue("born", "");
                            formik.setFieldValue("powerAuthority", "");
                            formik.setFieldValue("powerAuthority", "");
                            formik.setFieldValue("address", "");
                            formik.setFieldValue("mailAddress", "");
                            formik.setFieldValue("bankAccount", "");
                            formik.setFieldValue("telephone", "");
                            formik.setFieldValue("fatcaStatus", "");
                            formik.setFieldValue("explanation", []);
                            formik.setFieldValue("w8Form", []);
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  {formik.values.citizen === "1" && (
                    <>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="2. Are you a U.S resident?"
                            name="resident"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>

                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="3. Are you holding a U.S. Permanent Resident Card (Green
                    Card)?"
                            name="greenCard"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="4. Were you born in the U.S?"
                            name="born"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="5. Have you granted power of attorney or signatory authority to a person with a U.S. address?"
                            name="powerAuthority"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="6. Do you have a U.S. residential address?"
                            name="address"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="7. Do you have a correspondence, C/O or Hold mail address in
                    the U.S.?"
                            name="mailAddress"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="8. Do you have a standing order to a U.S. Bank Account?"
                            name="bankAccount"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>

                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="9. Do you have a U.S. telephone number?"
                            name="telephone"
                            options={ComplianceResponse}
                            required
                          />
                        </Box>
                      </Box>
                      <Box sx={styles.innerContainer}>
                        <Box sx={styles.radioButtonContainer}>
                          <FormikControl
                            control="radio"
                            label="FATCA Status"
                            name="fatcaStatus"
                            options={ComplianceResponse}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "fatcaStatus",
                                e.target.value
                              );
                              formik.setFieldValue("W8Form", []);
                              formik.setFieldValue("explanation", []);
                            }}
                            required
                          />
                        </Box>
                      </Box>
                      <Box>
                        {formik.values.fatcaStatus === "1" && (
                          <Box>
                            <Box sx={styles.fatcaStatusContainer}>
                              <Typography
                                sx={styles.subtitle3}
                                variant="subtitle3"
                              >
                                IF Yes, Document to be completed
                              </Typography>

                              <Typography
                                sx={styles.subtitle3}
                                variant="subtitle3"
                              >
                                1. Form W-8BEN (Non U.S. Persons only)
                              </Typography>
                            </Box>

                            <Box sx={styles.uploadContainer}>
                              <DownloadDiv
                                text="Download W-8BEN form here"
                                downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                              />
                            </Box>
                            <Box sx={styles.uploadContainer}>
                              <FormikControl
                                control="singleFileUpload"
                                label="Form W-8BEN (Non U.S. Persons only)"
                                name="W8Form"
                                mulitple={false}
                                required
                                givenFile={
                                  formik.values.W8Form !== undefined
                                    ? formik.values.W8Form[0]
                                    : null
                                }
                              />
                            </Box>

                            <Box sx={styles.uploadContainer}>
                              <FormikControl
                                control="singleFileUpload"
                                label="Written explanation for US born non-US citizens (Confirmation of renunciation of U.S. Citizenship / reason for not taking up U.S citizenship at birth)"
                                name="explanation"
                                mulitple={false}
                                required
                                givenFile={
                                  formik.values.explanation !== undefined
                                    ? formik.values.explanation[0]
                                    : null
                                }
                              />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </>
                  )}
                </ComplianceFormContainer>

                <Box sx={styles.dataProcessingContainer}>
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
                        service providers or agents (including but not limited
                        to its auditors, lawyers/ law firms, partner banks)
                        which may be sited outside of Kenya, for one or more of
                        the purposes, as such third party service providers or
                        agents, if engaged by iPay, would be processing my
                        personal data for iPay for one or more of the purposes
                        set out in that Data Privacy Statement.
                      </Typography>
                      <Typography
                        sx={styles.dataProcessingTitle}
                        variant="subtitle3"
                      >
                        iii. I am aware that I may withdraw my consent at any
                        time by using the iPay Consent Withdraw Form available
                        in the iPay Portal. iv. By submitting this online Form,
                        I represent and warrant that I am the user and / or
                        subscriber of the personal data as set out in my
                        application form and/or otherwise provided by me or my
                        authorized representative or possessed by iPay, and that
                        I have read and understood all of the above provisions,
                        including the Data Privacy Statement availed at
                        (iPayafrica.com)
                      </Typography>

                      <Typography
                        sx={styles.dataProcessingTitle}
                        variant="subtitle3"
                      >
                        v. I/We authorize iPay to process my/our sensitive
                        personal data both within and outside kenya, in
                        accordance with our Privacy Statement. vi. I/We
                        authorize iPay to process my/our personal data for
                        analytics/ market research or for marketing/advertising
                        or for similar commercial purposes in accordance with
                        the Privacy Statement.
                      </Typography>

                      <Box sx={{ mt: 10 }}>
                        <FormikControl
                          control="checkbox"
                          name="consent"
                          options={consent}
                        />
                      </Box>
                    </Box>
                  </ComplianceFormContainer>
                </Box>

                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid}
                >
                  Save and Next
                </LoadingButton>
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
