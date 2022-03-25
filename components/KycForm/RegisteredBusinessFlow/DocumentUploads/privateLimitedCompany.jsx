import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form, useFormikContext } from "formik";

import FormikControl from "../../../FormikControls/index";
import PrivateLimitedCompanyContainer from "../../../../atoms/CreateAccountFormDiv";

import { privateLimitedCompany } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/documentUploads/privateLimitedCompany";
import { styles } from "./styles";
import FileHeader from "../../../DocumentUploadWithProgress/FileHeader";

const initialValues = { f1: [], f2: [] };

const PrivateLimitedCompany = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);
  const [individualFieldErrors, setIndividualFieldErrors] = useState({});

  const handleFieldError = (fieldName, error) => {
    setIndividualFieldErrors({ [fieldName]: error });
  };

  const handleSubmit = async (values, { setErrors }) => {
    // if (values.f1 === undefined) {
    //   setIndividualFieldErrors({ f1: { error: "Its Required" } });
    // }
    console.log(values, "values");
    const isValid = await privateLimitedCompany.isValid(values, {
      abortEarly: false,
    });
    console.log(isValid, "isValid");
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    // handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      f1: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
      f2: [],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={1}>
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
                    label="Colored Passport Size Photograph of Business Owner/(s)"
                    name="f1"
                    multiple={false}
                    required
                    givenFile={
                      formik.values.f1.length !== 0 ? formik.values.f1[0] : null
                    }
                    handleFieldError={handleFieldError}
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
                    label="ID or passport of Business Owner/(s)"
                    name="f2"
                    mulitple={false}
                    required
                    givenFile={
                      formik.values.f2.length !== 0 ? formik.values.f2[0] : null
                    }
                  />

                  <FormikControl
                    control="singleFileUpload"
                    label="Tax PIN certificate for the company "
                    name="f3"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Filled Merchant Application Forms"
                    name="f4"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Colored Passport Size Photograph of Business Owner/(s)"
                    name="f5"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Colored Passport Size Photograph of Business Owner/(s)"
                    name="f6"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Memorandum and Articles of Association"
                    name="f7"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Business Permit from government"
                    name="f8"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Board Resolution/Letter on a letter head"
                    name="f9"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Company Status Report (formerly known as CR12)"
                    name="f10"
                    required
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Colored Passport Size Photograph of Business Owner/(s)"
                    name="f11"
                    required
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
                  Save and Next
                </LoadingButton>
              </PrivateLimitedCompanyContainer>
              <pre style={{ color: "black" }}>
                {JSON.stringify(formik.values, formik.errors, null, 4)}
              </pre>
              <pre>{JSON.stringify(formik.errors)}</pre>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

PrivateLimitedCompany.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default PrivateLimitedCompany;
