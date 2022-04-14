import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import GovernmentDepartmentContainer from "../../../../../atoms/CreateAccountFormDiv";
import DownloadDiv from "../../../../../atoms/DownloadDiv";
import MuiAlert from "../../../../../atoms/MuiAlert";

import { governmentDepartment } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/governmentDepartment";

import { styles } from "../styles";

const initialValues = {
  pinCertificate: [],
  certificateOfRegistration: [],
  businessPermit: [],
  boardResolutionLetter: [],
  aml: [],
};

const GovernmentDepartment = ({ handleNextStep }) => {
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
        console.log(response, "response");
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Fulfillment Details Updated Successfully!",
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
      });
  };

  useEffect(() => {
    const savedValues = {
      pinCertificate: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
      certificateOfRegistration: [],
      businessPermit: [],
      boardResolutionLetter: [],
      aml: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <>
      <Stack sx={styles.topContainer} spacing={3}>
        <Formik
          validationSchema={governmentDepartment}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <GovernmentDepartmentContainer topLabel="Government Department or state corporations">
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
                      formik.values.businessPermit.length === 0 ||
                      formik.values.boardResolutionLetter.length === 0 ||
                      formik.values.aml.length === 0 ||
                      formik.isSubmitting
                    }
                  >
                    Save
                  </LoadingButton>
                </GovernmentDepartmentContainer>
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

GovernmentDepartment.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default GovernmentDepartment;
