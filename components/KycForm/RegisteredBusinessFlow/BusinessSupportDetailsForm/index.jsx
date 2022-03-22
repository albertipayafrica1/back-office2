import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";
import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import { businessSupportDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessSupportDetails";

import * as styles from "./styles";

const BusinessSupportDetailsForm = () => {
  const handleSubmit = (values, formikHelpers) => {};

  const loading = false;
  const initialValues = {
    customerSupportTelephoneNumber: "",
    customerSupportAddress: "",
    customerSupportEmailAddress: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={businessSupportDetails}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <Stack sx={styles.formContainer} spacing={8}>
              <Typography variant="subtitle1">
                This information helps customers recognize your business. Your
                support information may be visible in payment statements,
                involves and receipts
              </Typography>
              <CreateAccountFormDiv topLabel="Business Support Details">
                <Stack direction="column" spacing={2}>
                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="customerSupportTelephoneNumber"
                    label="Customer Support Telephone Number"
                    type="number"
                    id="customerSupportTelephoneNumberb"
                    required
                  />
                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="customerSupportAddress"
                    label="Customer Support Address"
                    type="text"
                    id="customerSupportAddress"
                    required
                  />
                  <FormikControl
                    control="input"
                    label="customer Support Email Address"
                    name="customerSupportEmailAddress"
                    variant="outlined"
                    type="text"
                    id="customerSupportEmailAddress"
                    required
                  />
                </Stack>
              </CreateAccountFormDiv>
              <LoadingButton
                loading={loading}
                variant="contained"
                type="submit"
                size="large"
                sx={styles.saveAndNextButton}
                disabled={!formik.isValid}
              >
                Save & Next
              </LoadingButton>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BusinessSupportDetailsForm;
