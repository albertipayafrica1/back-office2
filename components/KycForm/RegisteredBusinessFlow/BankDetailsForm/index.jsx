import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../FormikControls/index";

import BankDetailsContainer from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";

import { currency, bankLocation } from "./data";
import { bankDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/bankDetails";
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
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/bank-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Bank Details Updated Successfully!",
          });
          handleNextStep();
          setLoading(false);
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        } else if (error.response.status === 406) {
          formikHelpers.setErrors({ ...error.response.data.response });
          setAlert({ type: "error", message: "Kindly Resolve Form Errors" });
        } else if (error.response) {
          if (error.response.data.response !== undefined) {
            setAlert({
              type: "error",
              message: error.response.data.response,
            });
          } else {
            setAlert({
              type: "error",
              message: "Something Went Wrong",
            });
          }
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error, "third if else");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/bank-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        console.log(response, "response");
        if (response.data.success === true) {
          setFormValues(response.data.response);
          setRetrievalLoading(false);
        } else {
          console.log(response, "response0");
          setAlert({ type: "error", message: "Something Went Wrong" });
          setRetrievalLoading(false);
        }
      })
      .catch((error) => {
        setRetrievalLoading(false);
        if (error.response === undefined) {
          setAlert({ type: "error", message: "Something Went Wrong" });
        } else if (error.response.status === 401) {
          // make a request to logout route here
          setAlert({ type: "error", message: error.response.data.response });
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        } else if (error.response) {
          if (error.response.data.response !== undefined) {
            setAlert({
              type: "error",
              message: error.response.data.response,
            });
          } else {
            setAlert({
              type: "error",
              message: "Something Went Wrong",
            });
          }
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error, "third if else");
        }
        setRetrievalLoading(false);
      });
    setFormValues({
      bankLocality: "",
      bankName: "",
      bankBranch: "",
      accountName: "",
      accountNumber: "",
      currency: "",
      swiftCode: "",
    });
  }, []);

  if (retrievalLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
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
                      name="bankLocality"
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
                      selectItem={currency}
                      name="currency"
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
                    loading={loading}
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
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

BankDetailsForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BankDetailsForm;
