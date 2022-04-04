import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import WeddingContainer from "../../../../../atoms/CreateAccountFormDiv";

import { wedding } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/documentUploads/wedding";

import { styles } from "../styles";

const initialValues = {
  letterFromInstitution: [],
};

const Wedding = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);

  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await wedding.isValid(values, {
    //   abortEarly: false,
    // });
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    // handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      letterFromInstitution: [
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
        validationSchema={wedding}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <WeddingContainer topLabel="Wedding">
                <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                  <FormikControl
                    control="singleFileUpload"
                    label="	Letter from the institution that is to wed the couple stating the duration"
                    name="letterFromInstitution"
                    multiple={false}
                    givenFile={
                      formik.values.letterFromInstitution !== undefined
                        ? formik.values.letterFromInstitution[0]
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
                    formik.values.letterFromInstitution.length === 0 ||
                    formik.isSubmitting
                  }
                >
                  Save
                </LoadingButton>
              </WeddingContainer>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

Wedding.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default Wedding;
