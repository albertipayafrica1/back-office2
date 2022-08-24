import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Box, Typography, IconButton, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";

import FormikControl from "../../FormikControls/index";

import Loader from "../../../atoms/Loader";
import MuiAlert from "../../../atoms/MuiAlert";
import TransactionButton from "../../../atoms/TransactionButton";

import { billPayment } from "../../../utils/formValidations/payoutsNewTransfer/billPayment";
import { getTelephoneCountryCode } from "../../../utils/countryOfOperation";
import { telephoneCodes } from "../../../utils/data";

import * as styles from "./styles";
import { billTypeOptions, providerOptions } from "./data";

const initialValues = {
  billType: "",
  provider: "",
  telephoneCountryCode: "KE",
  mobileNumber: "",
  accountNumber: "",
  amount: "",
};

const SingleTransfer = ({ toggleNewTransfer }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState();
  const [loading, setLoading] = useState(false);
  const [retrievalLoading, setRetrievalLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

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
    <>
      <Stack sx={{ p: 8 }} spacing={3}>
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.blue, pb: 8 }}
        >
          Buy Airtime, Pay your TV and Utility Bills
        </Typography>

        <Formik
          validationSchema={billPayment}
          initialValues={formValues || initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <Stack sx={{ maxWidth: "400px" }} spacing={2}>
                  <Stack direction="row">
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="billType"
                      label="Bill Type"
                      type="text"
                      select
                      selectItem={billTypeOptions}
                      id="billType"
                      shrink
                      placeholder=""
                      required
                    />
                  </Stack>

                  <FormikControl
                    control="input"
                    label="Provider"
                    name="provider"
                    variant="outlined"
                    type="text"
                    select
                    selectItem={providerOptions}
                    id="provider"
                    shrink
                    placeholder=""
                    required
                  />
                  <Stack direction="row" spacing={2}>
                    <Box sx={{ maxWidth: "200px" }}>
                      <FormikControl
                        control="autocomplete"
                        name="telephoneCountryCode"
                        label="Code"
                        use="telephoneCountryCode"
                        options={telephoneCodes}
                        required
                        defaultValue={getTelephoneCountryCode("KE")}
                      />
                    </Box>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="mobileNumber"
                      label="Mobile Number"
                      type="text"
                      id="mobileNumber"
                      shrink
                      placeholder="xxxxxxxxx"
                      required
                    />
                  </Stack>

                  {formik.values.billType !== "" &&
                    formik.values.billType !== "1" && (
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="accountNumber"
                        label="Account Number"
                        type="text"
                        id="accountNumber"
                        shrink
                        placeholder="Enter Account Number"
                        required
                      />
                    )}

                  <FormikControl
                    control="input"
                    variant="outlined"
                    name="amount"
                    label="Amount"
                    type="text"
                    id="amount"
                    shrink
                    placeholder="0"
                    required
                  />

                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="orange"
                      sx={{ height: "50px", width: "200px" }}
                      type="submit"
                      disabled={formik.isValid === false || formik.isSubmitting}
                      withoutIconMedia
                    >
                      Pay Bill
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
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

SingleTransfer.propTypes = {
  toggleNewTransfer: PropTypes.func.isRequired,
};

export default SingleTransfer;
