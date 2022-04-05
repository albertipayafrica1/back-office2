import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../FormikControls/index";
import BankDetailsContainer from "../../../../atoms/CreateAccountFormDiv";
import { Currency, bankLocation } from "./data";
import { bankDetails } from "../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/bankDetails";
import { styles } from "./styles";

const initialValues = {
  bankLocality: "",
  bankName: "",
  bankBranch: "",
  accountName: "",
  accountNumber: "",
  currency: "",
  swiftCode: "",
};

const BankDetailsForm = ({ handleNextStep }) => {
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = (values, { setErrors }) => {
    handleNextStep();
  };

  useEffect(() => {
    const savedValues = {
      // this you get it from api call
      bankLocality: "",
      bankName: "KCB",
      bankBranch: "",
      accountName: "",
      accountNumber: "",
      currency: "",
      swiftCode: "",
    };
    setFormValues(savedValues);
  }, []);
  return (
    <Stack sx={styles.topContainer} spacing={1}>
      <Formik
        validationSchema={bankDetails}
        initialValues={formValues || initialValues}
        onSubmit={handleSubmit} // pass this as props
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <BankDetailsContainer topLabel="Bank Details">
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <FormikControl
                    control="select"
                    label="Bank Locality"
                    name=" bankLocality"
                    select
                    selectItem={bankLocation}
                    variant="outlined"
                    id=" bank Locality"
                    required
                  />

                  <FormikControl
                    control="input"
                    label="Bank Name"
                    placeholder="Merchant Bank Name"
                    name="bankName"
                    variant="outlined"
                    type="text"
                    id="bankName"
                    required
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  mt={2}
                >
                  <FormikControl
                    control="input"
                    label="Bank Branch"
                    placeholder="Merchant Bank Branch"
                    name="bankBranch"
                    variant="outlined"
                    type="text"
                    id="banckBranch"
                    required
                  />

                  <FormikControl
                    control="input"
                    label="Account Name"
                    placeholder="Bank Account Name"
                    name="accountName"
                    variant="outlined"
                    type="text"
                    id="accountName"
                    required
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  mt={2}
                >
                  <FormikControl
                    control="input"
                    label="Account Number"
                    placeholder="Bank Account Number"
                    name="accountNumber"
                    variant="outlined"
                    type="text"
                    id="accountNumber"
                    required
                  />

                  <FormikControl
                    control="select"
                    label="Account Currency"
                    placeholder="USD | KES | TZS"
                    select
                    selectItem={Currency}
                    name="accountCurrency"
                    variant="outlined"
                    type="text"
                    id="accountCurrency"
                    required
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1 }}
                  mt={2}
                >
                  <FormikControl
                    control="input"
                    label="IBAN / SWIFT Code"
                    name="swiftCode"
                    variant="outlined"
                    type="text"
                    id="swiftCode"
                    required
                  />
                </Stack>
                <LoadingButton
                  loading={false}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid}
                >
                  Save and Next
                </LoadingButton>
              </BankDetailsContainer>
            </Form>
          );
        }}
      </Formik>
      <Box />
    </Stack>
  );
};

BankDetailsForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BankDetailsForm;
