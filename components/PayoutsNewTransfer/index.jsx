import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Formik, Form } from "formik";

import { ArrowForward } from "@mui/icons-material";
import FormikControl from "../FormikControls/index";

import Loader from "../../atoms/Loader";
import MuiAlert from "../../atoms/MuiAlert";
import PageViewBox from "../../atoms/PageViewBox";
import TransactionButton from "../../atoms/TransactionButton";

import { bankDetails } from "../../utils/formValidations/kyc/registeredBusinessFlow/bankDetails";

import * as styles from "./styles";
import { payoutModeOptions } from "./data";

const initialValues = {
  bankLocality: "",
  bankName: "",
  bankBranch: "",
  accountName: "",
  accountNumber: "",
  currency: "",
  swiftCode: "",
};

const PayoutsNewTransfer = ({ toggleNewTransfer }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [savingAccountDetails, setSavingAccountDetails] = useState(false);

  const handleSaveAccountDetails = () => {
    setSavingAccountDetails(true);
  };

  const handleSubmit = (values, formikHelpers) => {
    // setLoading(true);
    // setAlert({ type: "", message: "" });
    // const credentials = Cookies.get("iPayT");
    // const config = {
    //   method: "post",
    //   url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${credentials}`,
    //   },
    //   data: JSON.stringify(values),
    //   withCredentials: true,
    // };
    // axios(config)
    //   .then((response) => {
    //     if (response.data.success === true) {
    //       setAlert({
    //         type: "success",
    //         message: "Bank Details Updated Successfully!",
    //       });
    //       setLoading(false);
    //       dispatch(fetchKycStatusSuccess(response.data.response.kycStatus));
    //       handleNextStep();
    //     } else {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //       setLoading(false);
    //       formikHelpers.setSubmitting(false);
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     if (error.response === undefined) {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //     } else if (error.response.status === 401) {
    //       setAlert({ type: "error", message: error.response.data.response });
    //       setTimeout(() => {
    //         router.replace("/");
    //       }, 2000);
    //     } else if (error.response.status === 406) {
    //       formikHelpers.setErrors({ ...error.response.data.response });
    //       setAlert({ type: "error", message: "Kindly Resolve Form Errors" });
    //     } else if (error.response) {
    //       if (error.response.data.response !== undefined) {
    //         setAlert({
    //           type: "error",
    //           message: error.response.data.response,
    //         });
    //       } else {
    //         setAlert({
    //           type: "error",
    //           message: "Something Went Wrong",
    //         });
    //       }
    //     } else {
    //       setAlert({ type: "error", message: "Something Went Wrong" });
    //     }
    //     setLoading(false);
    //     formikHelpers.setSubmitting(false);
    //   });
  };

  useEffect(() => {
    //  setRetrievalLoading(true);
    //  const credentials = Cookies.get("iPayT");
    //  const config = {
    //    method: "get",
    //    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/bank-details`,
    //    headers: {
    //      "Content-Type": "application/json",
    //      Authorization: `Bearer ${credentials}`,
    //    },
    //    withCredentials: true,
    //  };
    //  axios(config)
    //    .then((response) => {
    //      if (response.data.success === true) {
    //        setRetrievalLoading(false);
    //        setFormValues(response.data.response);
    //      } else {
    //        setAlert({ type: "error", message: "Something Went Wrong" });
    //        setRetrievalLoading(false);
    //      }
    //    })
    //    .catch((error) => {
    //      setRetrievalLoading(false);
    //      if (error.response === undefined) {
    //        setAlert({ type: "error", message: "Something Went Wrong" });
    //      } else if (error.response.status === 401) {
    //        setAlert({ type: "error", message: error.response.data.response });
    //        setTimeout(() => {
    //          router.replace("/");
    //        }, 2000);
    //      } else if (error.response) {
    //        if (error.response.data.response !== undefined) {
    //          setAlert({
    //            type: "error",
    //            message: error.response.data.response,
    //          });
    //        } else {
    //          setAlert({
    //            type: "error",
    //            message: "Something Went Wrong",
    //          });
    //        }
    //      } else {
    //        setAlert({ type: "error", message: "Something Went Wrong" });
    //      }
    //      setRetrievalLoading(false);
    //    });
  }, []);

  if (retrievalLoading) {
    return <Loader spaceAround="md" alignment={{ height: "65vh" }} />;
  }

  return (
    <PageViewBox>
      <Stack sx={{ p: 8 }} spacing={3}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="subtitle5"
            sx={{ color: (theme) => theme.colors.blue }}
          >
            1. Single Transfer
          </Typography>
          <IconButton aria-label="back" onClick={toggleNewTransfer}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.orange }}
        >
          Enter Transfer Details
        </Typography>
        <Formik
          validationSchema={bankDetails}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit} // pass this as props
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack sx={{ width: "300px" }} spacing={2}>
                  <Stack direction="row">
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="payoutMode"
                      label="Payout Mode"
                      type="text"
                      select
                      selectItem={payoutModeOptions}
                      id="paymentChannel"
                      shrink
                      placeholder=""
                    />
                  </Stack>

                  <FormikControl
                    control="input"
                    label="Account Id"
                    name="accountId"
                    variant="outlined"
                    type="text"
                    id="accountId"
                    shrink
                    placeholder=""
                  />

                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="merchantRef"
                    label="Merchant Reference"
                    type="text"
                    id="merchantRef"
                    shrink
                    placeholder=""
                  />

                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="narration"
                    label="Narration"
                    type="text"
                    id="narration"
                    shrink
                    placeholder=""
                  />

                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="amount"
                    label="Amount"
                    type="text"
                    id="amount"
                    shrink
                    placeholder=""
                  />
                  {savingAccountDetails ? (
                    <Loader spaceAround="xs" />
                  ) : (
                    <Typography
                      variant="subtitle5"
                      sx={{
                        color: (theme) => theme.colors.blue,
                        cursor: "pointer",
                        p: 3,
                      }}
                      onClick={handleSaveAccountDetails}
                    >
                      Save account details?
                    </Typography>
                  )}

                  <Stack direction="row" spacing={3}>
                    <Button variant="orange" sx={{ height: "50px" }}>
                      Initiate Transfer
                    </Button>

                    <TransactionButton
                      text="Reset Details"
                      onClick={() => {
                        return formik.resetForm();
                      }}
                    />
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Stack>
    </PageViewBox>
  );
};

PayoutsNewTransfer.propTypes = {
  toggleNewTransfer: PropTypes.func.isRequired,
};

export default PayoutsNewTransfer;
