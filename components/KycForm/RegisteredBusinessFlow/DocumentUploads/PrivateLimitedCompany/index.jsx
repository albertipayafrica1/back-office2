import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import PrivateLimitedCompanyContainer from "../../../../../atoms/CreateAccountFormDiv";
import DownloadDiv from "../../../../../atoms/DownloadDiv";
import MuiAlert from "../../../../../atoms/MuiAlert";
import Loader from "../../../../../atoms/Loader";

import { privateLimitedCompany } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/privateLimitedCompany";

import { fetchKycStatusSuccess } from "../../../../../redux";

import { styles } from "../styles";

const initialValues = {
  pinCertificate: [],
  certificateOfRegistration: [],
  memorandumAndArticlesOfAssociation: [],
  businessPermit: [],
  boardResolutionLetter: [],
  companyStatusReport: [],
  aml: [],
};

const PrivateLimitedCompany = ({ handleNextStep }) => {
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/business-docs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Private Limited Company Details Updated Successfully!",
          });
          setLoading(false);
          dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
          handleNextStep();
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
          formikHelpers.setSubmitting(false);
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        formikHelpers.setSubmitting(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/business-docs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setRetrievalLoading(false);
          setFormValues(response.data.response);
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setRetrievalLoading(false);
        }
      })
      .catch((error) => {
        setRetrievalLoading(false);
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setRetrievalLoading(false);
      });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }

  return (
    <>
      <Stack sx={styles.topContainer} spacing={3}>
        <Formik
          validationSchema={privateLimitedCompany}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <PrivateLimitedCompanyContainer topLabel="Private Limited Company">
                  <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                    <FormikControl
                      control="singleFileUpload"
                      label="Tax PIN certificate for the company"
                      name="pinCertificate"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.pinCertificate !== undefined
                          ? formik.values.pinCertificate[0]
                          : null
                      }
                    />
                    {/* {Object.entries(formik.errors).length !== 0 &&
                    formik.errors.f1 !== undefined && (
                      <div>{formik.errors.f1}</div>
                    )} */}
                    {/* {Object.entries(individualFieldErrors).length !== 0 &&
                    individualFieldErrors.f1 !== undefined && (
                      <div>{individualFieldErrors.f1.error}</div>
                    )} */}
                    {/* {formik.values.f1.length !== 0 &&
                    formik.values.f1[0].errors.length === 0 && (
                      <FileHeader
                        file={formik.values.f1[0].file}
                        progress={100}
                        onDelete={() => {
                          formik.setFieldValue("f1", []);
                        }}
                      />
                    )} */}

                    <FormikControl
                      control="singleFileUpload"
                      label="Certificate Of Registration"
                      name="certificateOfRegistration"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.certificateOfRegistration !== undefined
                          ? formik.values.certificateOfRegistration[0]
                          : null
                      }
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Memorandum And Articles Of Association"
                      name="memorandumAndArticlesOfAssociation"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.memorandumAndArticlesOfAssociation !==
                        undefined
                          ? formik.values.memorandumAndArticlesOfAssociation[0]
                          : null
                      }
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Business Permit From Government"
                      name="businessPermit"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.businessPermit !== undefined
                          ? formik.values.businessPermit[0]
                          : null
                      }
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Board Resolution Letter"
                      name="boardResolutionLetter"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.boardResolutionLetter !== undefined
                          ? formik.values.boardResolutionLetter[0]
                          : null
                      }
                    />

                    <FormikControl
                      control="singleFileUpload"
                      label="Company Status Report"
                      name="companyStatusReport"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.companyStatusReport !== undefined
                          ? formik.values.companyStatusReport[0]
                          : null
                      }
                    />
                    <DownloadDiv
                      text="Download Our AML (Anti-Money Laundering)/KYC questionnaire for signature"
                      downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Reupload AML (Anti-Money Laundering)/KYC questionnaire"
                      name="aml"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.aml !== undefined
                          ? formik.values.aml[0]
                          : null
                      }
                    />
                  </Stack>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={styles.submitButton}
                    disabled={
                      formik.values.pinCertificate.length === 0 ||
                      formik.values.certificateOfRegistration.length === 0 ||
                      formik.values.memorandumAndArticlesOfAssociation
                        .length === 0 ||
                      formik.values.businessPermit.length === 0 ||
                      formik.values.boardResolutionLetter.length === 0 ||
                      formik.values.companyStatusReport.length === 0 ||
                      formik.values.aml.length === 0 ||
                      formik.isSubmitting
                    }
                  >
                    Save
                  </LoadingButton>
                </PrivateLimitedCompanyContainer>
                {/* <pre style={{ color: "black" }}>   //meant for debugging
                {JSON.stringify(formik.values, formik.errors, null, 4)}
              </pre>
              <pre>{JSON.stringify(formik.errors)}</pre> */}
              </Form>
            );
          }}
        </Formik>
      </Stack>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

PrivateLimitedCompany.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default PrivateLimitedCompany;
