import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../../FormikControls/index";
import FundRaisingContainer from "../../../../../atoms/CreateAccountFormDiv";

import { fundRaising } from "../../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/documentUploads/fundRaising";

import { styles } from "../styles";

const initialValues = {
  coverLetter: [],
};

const FundRaising = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);

  // const [individualFieldErrors, setIndividualFieldErrors] = useState({});

  // const handleFieldError = (fieldName, error) => {
  //   setIndividualFieldErrors({ [fieldName]: error });
  // };

  const handleSubmit = async (values, formikHelpers) => {
    // const isValid = await fundRaising.isValid(values, {
    //   abortEarly: false,
    // });
    // setIndividualFieldErrors({ f1: { error: "i am an error" } });
    handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      coverLetter: [
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
        validationSchema={fundRaising}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <FundRaisingContainer topLabel="Fund Raising">
                <Stack direction={{ xs: "column" }} spacing={{ xs: 3 }}>
                  <FormikControl
                    control="singleFileUpload"
                    label="A covering letter from the committee stating the purpose of the Paybill and the Bank A/C details should be stated in the letter. At least two Committee officials to sign the letter"
                    name="coverLetter"
                    multiple={false}
                    givenFile={
                      formik.values.coverLetter !== undefined
                        ? formik.values.coverLetter[0]
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
                    formik.values.coverLetter.length === 0 ||
                    formik.isSubmitting
                  }
                >
                  Save
                </LoadingButton>
              </FundRaisingContainer>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

FundRaising.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default FundRaising;
