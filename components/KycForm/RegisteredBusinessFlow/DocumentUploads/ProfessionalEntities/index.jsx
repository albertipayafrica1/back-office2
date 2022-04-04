import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import ProfessionalEntitiesContainer from "../../../../../atoms/CreateAccountFormDiv";
import DownloadDiv from "../../../../../atoms/DownloadDiv";

import { professionalEntities } from "../../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/professionalEntities";

import { styles } from "../styles";

const initialValues = {
  pinCertificate: [],
  certificateOfRegistration: [],
  businessPermit: [],
  boardResolutionLetter: [],
  companyStatusReport: [],
  aml: [],
};

const ProfessionalEntities = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);

  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await professionalEntities.isValid(values, {
    //   abortEarly: false,
    // });
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    // handleNextStep();
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
      companyStatusReport: [],
      aml: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={3}>
      <Formik
        validationSchema={professionalEntities}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <ProfessionalEntitiesContainer topLabel="Accounts for professionals entities (Law firms, Values, Auditors etc.)">
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
                  loading={false}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={
                    formik.values.pinCertificate.length === 0 ||
                    formik.values.certificateOfRegistration.length === 0 ||
                    formik.values.businessPermit.length === 0 ||
                    formik.values.boardResolutionLetter.length === 0 ||
                    formik.values.companyStatusReport.length === 0 ||
                    formik.values.aml.length === 0 ||
                    formik.isSubmitting
                  }
                >
                  Save
                </LoadingButton>
              </ProfessionalEntitiesContainer>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

ProfessionalEntities.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default ProfessionalEntities;
