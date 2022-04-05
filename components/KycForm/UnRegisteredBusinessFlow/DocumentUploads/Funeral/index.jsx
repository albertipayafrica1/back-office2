import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import FuneralContainer from "../../../../../atoms/CreateAccountFormDiv";

import { funeral } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/documentUploads/funeral";
import { styles } from "../styles";

const initialValues = {
  burialPermit: [],
};

const Funeral = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);

  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await funeral.isValid(values, {
    //   abortEarly: false,
    // });
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    // handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      burialPermit: [
        {
          file: { path: "elipa-Single-logos-black.png" },
          errors: [],
          id: 1,
          url: "https://res.cloudinary.com/demo/image/upload/v1648551450/docs_uploading_example/elipa-Single-logos-black_fqcxd1.png",
        },
      ],
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={3}>
      <Formik
        validationSchema={funeral}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <FuneralContainer topLabel="Funeral">
                <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                  <FormikControl
                    control="singleFileUpload"
                    label="Copy of burial permit or copy of death notification"
                    name="burialPermit"
                    multiple={false}
                    givenFile={
                      formik.values.burialPermit !== undefined
                        ? formik.values.burialPermit[0]
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
                    formik.values.burialPermit.length === 0 ||
                    formik.isSubmitting
                  }
                >
                  Save
                </LoadingButton>
              </FuneralContainer>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

Funeral.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default Funeral;
