import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import WelfareGroupsContainer from "../../../../../atoms/CreateAccountFormDiv";
import DownloadDiv from "../../../../../atoms/DownloadDiv";

import { welfareGroups } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/welfareGroups";
import { acknowledgement } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/acknowledgement";
import { styles } from "../styles";

const initialValues = {
  pinCertificate: [],
  certificateOfRegistration: [],
  businessPermit: [],
  boardResolutionLetter: [],
  aml: [],
  termsAndConditions: [],
};
const initialValuesForAcknowledgement = { acknowledgmentDocument: [] };

const WelfareGroups = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);
  const [formValuesForAcknowledgement, setFormValuesForAcknowledgement] =
    useState(null);
  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});
  const [showAcknowledgementDiv, setShowAcknowledgementDiv] = useState(false);

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await welfareGroups.isValid(values, {
    //   abortEarly: false,
    // });
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    // handleNextStep();
    setShowAcknowledgementDiv(true);
  };

  const handleAcknowledgementSubmit = async (values, formikHelpers) => {};

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
      termsAndConditions: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={3}>
      <Formik
        validationSchema={welfareGroups}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <WelfareGroupsContainer topLabel="Chama and Welfare Groups">
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
                  <DownloadDiv
                    text="Download Our Terms And Conditions Form for signature"
                    downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Dully filled and signed Terms and Conditions Form"
                    name="termsAndConditions"
                    multiple={false}
                    required
                    givenFile={
                      formik.values.termsAndConditions !== undefined
                        ? formik.values.termsAndConditions[0]
                        : null
                    }
                  />
                </Stack>

                <LoadingButton
                  loading={false}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Save
                </LoadingButton>
              </WelfareGroupsContainer>
              {/* <pre style={{ color: "black" }}>   //meant for debugging
                {JSON.stringify(formik.values, formik.errors, null, 4)}
              </pre>
              <pre>{JSON.stringify(formik.errors)}</pre> */}
            </Form>
          );
        }}
      </Formik>

      {showAcknowledgementDiv && (
        <Formik
          validationSchema={acknowledgement}
          initialValues={
            formValuesForAcknowledgement || initialValuesForAcknowledgement
          }
          onSubmit={handleAcknowledgementSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <WelfareGroupsContainer topLabel="Acknowledgement Form">
                  <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                    <DownloadDiv
                      text="Download Our Terms And Conditions Form for signature"
                      downloadUrl="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                    />
                    <FormikControl
                      control="singleFileUpload"
                      label="Upload signed acknowledgement document"
                      name="acknowledgmentDocument"
                      multiple={false}
                      required
                      givenFile={
                        formik.values.acknowledgmentDocument !== undefined
                          ? formik.values.acknowledgmentDocument[0]
                          : null
                      }
                    />
                    <LoadingButton
                      loading={false}
                      variant="contained"
                      type="submit"
                      size="large"
                      sx={styles.submitButton}
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Save And Next
                    </LoadingButton>
                  </Stack>
                </WelfareGroupsContainer>
              </Form>
            );
          }}
        </Formik>
      )}
    </Stack>
  );
};

WelfareGroups.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default WelfareGroups;