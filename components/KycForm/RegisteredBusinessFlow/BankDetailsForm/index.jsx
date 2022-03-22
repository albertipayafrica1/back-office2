import { Stack, Button, Box } from "@mui/material";
import { Formik, Form } from "formik";
import { LoadingButton } from "@mui/lab";
import FormikControl from "../../../FormikControls/index";
import BankDetailsContainer from "../../../../atoms/CreateAccountFormDiv";
import { Currency, bankLocation } from "./data";
import { bankDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/bankDetails";
import { styles } from "./styles";

const handleSubmit = (values, { setErrors }) => {
  // alert(JSON.stringify(values, null, 2));
};

const initialValues = {
  banklocation: "",
  bankname: "",
  bankbranch: "",
  accountname: "",
  accountnumber: "",
  currency: "",
  swiftcode: "",
};

const BankDetailsForm = () => {
  return (
    <Stack sx={styles.topContainer} spacing={1}>
      <Formik
        validationSchema={bankDetails}
        initialValues={initialValues}
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
                    name="banklocation"
                    select
                    selectItem={bankLocation}
                    variant="outlined"
                    id="bankdetails"
                    required
                  />

                  <FormikControl
                    control="input"
                    label="Bank Name"
                    placeholder="Merchant Bank Name"
                    name="bankname"
                    variant="outlined"
                    type="text"
                    id="bankname"
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
                    name="bankbranch"
                    variant="outlined"
                    type="text"
                    id="banck branch"
                    required
                  />

                  <FormikControl
                    control="input"
                    label="Account Name"
                    placeholder="Bank Account Name"
                    name="accountname"
                    variant="outlined"
                    type="text"
                    id="account name"
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
                    name="accountnumber"
                    variant="outlined"
                    type="text"
                    id="account number"
                    required
                  />

                  <FormikControl
                    control="select"
                    label="Account Currency"
                    placeholder="USD | KES | TZS"
                    select
                    selectItem={Currency}
                    name="currency"
                    variant="outlined"
                    type="text"
                    id="accountcurrency"
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
                    name="swiftcode"
                    variant="outlined"
                    type="text"
                    id="swiftcode"
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

export default BankDetailsForm;
