import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import SoleProprietorshipContainer from "../../../../../atoms/CreateAccountFormDiv";
import DownloadDiv from "../../../../../atoms/DownloadDiv";

import { soleProprietorship } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/soleProprietorship";
import { acknowledgement } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/acknowledgement";
import { styles } from "../styles";

const initialValues = {
  pinCertificate: [],
  certificateOfRegistration: [],
  businessPermit: [],
  aml: [],
  termsAndConditions: [],
};
const initialValuesForAcknowledgement = { acknowledgmentDocument: [] };

const SoleProprietorship = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);
  const [formValuesForAcknowledgement, setFormValuesForAcknowledgement] =
    useState(null);
  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});
  const [showAcknowledgementDiv, setShowAcknowledgementDiv] = useState(false);

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await soleProprietorship.isValid(values, {
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
      aml: [],
      termsAndConditions: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={3}>
      <Formik
        validationSchema={soleProprietorship}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <SoleProprietorshipContainer topLabel="Sole Proprietorship">
                <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                  <FormikControl
                    control="singleFileUpload"
                    label="Tax PIN certificate for the company"
                    name="pinCertificate"
                    multiple={false}
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
                    givenFile={
                      formik.values.businessPermit !== undefined
                        ? formik.values.businessPermit[0]
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
              </SoleProprietorshipContainer>
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
                <SoleProprietorshipContainer topLabel="Acknowledgement Form">
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
                </SoleProprietorshipContainer>
              </Form>
            );
          }}
        </Formik>
      )}
    </Stack>
  );
};

SoleProprietorship.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default SoleProprietorship;