import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import EducationContainer from "../../../../../atoms/CreateAccountFormDiv";

import { education } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/documentUploads/education";
import { styles } from "../styles";

const initialValues = {
  feeStructure: [],
  admissionLetter: [],
};

const Education = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);
  const [formErrors, setFormErrors] = useState(null);

  const handleSubmit = async (values, formikHelpers) => {
    const isValid = await education.isValid(values, {
      // on forms having only one upload use isValid function since formik does not setError to null during first load if we get it from server
      abortEarly: false,
    });
    console.log(isValid, "isvalid");

    // handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      feeStructure: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
      admissionLetter: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
    };

    const saveErrors = {
      feeStructure: "",
      admissionLetter: "",
    };
    setFormValues(savedValues);
    setFormErrors(saveErrors);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={3}>
      <Formik
        validationSchema={education}
        initialValues={formValues || initialValues}
        errors={formErrors || null}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          console.log(formik);
          return (
            <Form>
              <EducationContainer topLabel="Education">
                <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                  <FormikControl
                    control="singleFileUpload"
                    label="Fee Structure (Either Stamped Or On Institution Letter Head"
                    name="feeStructure"
                    multiple={false}
                    givenFile={
                      formik.values.feeStructure !== undefined
                        ? formik.values.feeStructure[0]
                        : null
                    }
                  />
                  <FormikControl
                    control="singleFileUpload"
                    label="Certified Admission Form On Letter Head"
                    name="admissionLetter"
                    multiple={false}
                    givenFile={
                      formik.values.admissionLetter !== undefined
                        ? formik.values.admissionLetter[0]
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
                    formik.values.feeStructure.length === 0 ||
                    formik.values.admissionLetter.length === 0 ||
                    formik.isSubmitting
                  }
                  // onClick={handleSubmit}  // can use this if we want to call handle submit even if there are form errors
                >
                  Save
                </LoadingButton>
              </EducationContainer>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

Education.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default Education;
