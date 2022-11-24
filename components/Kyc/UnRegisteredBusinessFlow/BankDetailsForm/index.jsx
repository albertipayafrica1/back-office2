import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../../FormikControls/index";
import BankDetailsContainer from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";

import { currency, bankLocation } from "./data";
import { bankDetails } from "../../../../utils/formValidations/kyc/unRegisteredBusinessFlow/bankDetails";

import { fetchKycStatusSuccess } from "../../../../redux";

import { styles } from "./styles";

const initialValues = {
  primaryAccount: {
    bankLocality: "",
    bankName: "",
    bankBranch: "",
    accountName: "",
    accountNumber: "",
    currency: "",
    swiftCode: "",
  },
};

const BankDetailsForm = ({ handleNextStep }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const companyRef = useSelector((state) => state.user.user.companyRef);

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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/${companyRef}/bank-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
        "Device-Channel": "web",
      },
      data: JSON.stringify(values),
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setAlert({
            type: "success",
            message: "Bank Details Updated Successfully!",
          });
          dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
          handleNextStep();
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          setLoading(false);
          formikHelpers.setSubmitting(false);
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setLoading(false);
        formikHelpers.setSubmitting(false);
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/${companyRef}/bank-details`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
        "Device-Channel": "web",
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setRetrievalLoading(false);
          setFormValues(response.data.response);
        } else {
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
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        setRetrievalLoading(false);
      });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
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
                      name="primaryAccount.bankLocality"
                      select
                      selectItem={bankLocation}
                      variant="outlined"
                      id="primaryAccount.bankLocality"
                      required
                    />
                    <FormikControl
                      control="input"
                      label="Bank Name"
                      placeholder="Merchant Bank Name"
                      name="primaryAccount.bankName"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.bankName"
                      required
                    />{" "}
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
                      name="primaryAccount.bankBranch"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.banckBranch"
                      required
                    />

                    <FormikControl
                      control="input"
                      label="Account Name"
                      placeholder="Bank Account Name"
                      name="primaryAccount.accountName"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.accountName"
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
                      name="primaryAccount.accountNumber"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.accountNumber"
                      required
                    />

                    <FormikControl
                      control="select"
                      label="Account Currency"
                      select
                      selectItem={currency}
                      name="primaryAccount.currency"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.currency"
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
                      name="primaryAccount.swiftCode"
                      variant="outlined"
                      type="text"
                      id="primaryAccount.swiftCode"
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
