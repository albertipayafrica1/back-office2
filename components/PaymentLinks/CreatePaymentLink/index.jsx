import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Box, Stack, useMediaQuery } from "@mui/material";

import { Formik, Form, yupToFormErrors, validateYupSchema } from "formik";

import FormikControl from "../../FormikControls/index";

import MuiAlert from "../../../atoms/MuiAlert";
import Loader from "../../../atoms/Loader";
import PageViewBox from "../../../atoms/PageViewBox";
import TransactionButton from "../../../atoms/TransactionButton";

import Header from "./Header";

import { telephoneCodes } from "../../../utils/data";
import { getTelephoneCountryCode } from "../../../utils/countryOfOperation";
import { createPaymentLink } from "../../../utils/formValidations/paymentLink/createPaymentLink";
import {
  changeAmountOptions,
  noExpiryOptions,
  recurringPaymentOptions,
} from "./data";

import * as styles from "./styles";

const initialValues = {
  currency: "",
  amount: "",
  changeAmount: [],
  minAmount: "",
  paymentDescription: "",
  recurringPayment: [],
  orderId: "",
  linkId: "xxxxx",
  customerDetails: {
    name: "",
    email: "",
    telephoneCountryCode: "KE",
    phoneNumber: "",
  },
  noExpiry: [],
  linkExpirationDate: null,
};
const CreatePaymentLink = ({ toggleCreatePaymentLink }) => {
  const globalCurrency = useSelector((state) => state.currency.globalCurrency);
  const matches = useMediaQuery("(min-width:800px)");
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentLink/generate`,
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
            message: "Business Structure Details Updated Successfully!",
          });
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
        }
        formikHelpers.setSubmitting(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        formikHelpers.setSubmitting(false);

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
      });
  };

  useEffect(() => {
    setRetrievalLoading(true);
    const credentials = Cookies.get("iPayT");

    const config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/paymentLink/generate`,
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
      <Box sx={{ p: 15 }}>
        <PageViewBox>
          <Stack spacing={5} sx={{ pt: 10 }}>
            <Header toggleCreatePaymentLink={toggleCreatePaymentLink} />
            <Formik
              validate={(value) => {
                try {
                  validateYupSchema(value, createPaymentLink, true, value);
                } catch (err) {
                  return yupToFormErrors(err);
                }
                return {};
              }}
              initialValues={initialValues || formValues}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {(formik) => {
                console.log(formik.errors);
                return (
                  <Box
                    sx={
                      (matches && { pl: 35, pr: 35, pb: 8 }) || {
                        pl: 5,
                        pr: 5,
                        pb: 5,
                      }
                    }
                  >
                    <Form>
                      <Stack spacing={3}>
                        <FormikControl
                          control="input"
                          label={`Amount In ${globalCurrency}`}
                          placholder="0"
                          name="amount"
                          variant="outlined"
                          type="number"
                          id="amount"
                          required
                          shrink
                        />
                        <FormikControl
                          control="checkbox"
                          options={changeAmountOptions}
                          name="changeAmount"
                          row
                          externalStyles={styles.checkboxExternalStyles}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue("changeAmount", ["true"]);
                            } else {
                              formik.setFieldValue("changeAmount", []);
                            }
                            formik.setFieldValue("minAmount", "");
                          }}
                        />
                        {(formik.values.changeAmount[0] === "true" ||
                          formik.values.changeAmount[0] !== undefined) && (
                          <FormikControl
                            control="input"
                            label="Set Minimum Amount"
                            placholder="0"
                            name="minAmount"
                            variant="outlined"
                            type="number"
                            id="amount"
                            required
                            shrink
                          />
                        )}
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="paymentDescription"
                          label="Payment For"
                          type="text"
                          placeholder="Payment Description"
                          id="paymentDescription"
                          required
                          multiline
                          shrink
                        />
                        <FormikControl
                          control="checkbox"
                          options={recurringPaymentOptions}
                          name="recurringPayment"
                          row
                          externalStyles={styles.checkboxExternalStyles}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue("recurringPayment", [
                                "true",
                              ]);
                            } else {
                              formik.setFieldValue("recurringPayment", []);
                            }
                            formik.setFieldValue("orderId", "");
                          }}
                        />
                        {(formik.values.recurringPayment[0] === "false" ||
                          formik.values.recurringPayment[0] === undefined) && (
                          <FormikControl
                            control="input"
                            label="Order Id"
                            name="orderId"
                            variant="outlined"
                            type="text"
                            id="orderId"
                            placeholder="xxxx"
                            shrink
                          />
                        )}

                        <FormikControl
                          control="input"
                          label="Link Id"
                          name="linkId"
                          variant="outlined"
                          type="text"
                          id="linkId"
                          placeholder="xxxx"
                          disabled
                          required
                          shrink
                        />

                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                        >
                          <FormikControl
                            control="input"
                            label="Customer Name"
                            name="customerDetails.name"
                            variant="outlined"
                            type="text"
                            id="customerDetails.name"
                            placeholder="John doe"
                            shrink
                          />
                          <FormikControl
                            control="input"
                            label="Customer Email"
                            name="customerDetails.email"
                            variant="outlined"
                            type="text"
                            id="customerDetails.email"
                            placeholder="johndoe@johndoe.com"
                            shrink
                          />
                        </Stack>
                        <Stack
                          sx={{
                            width: "100%",
                          }}
                          direction={{ xs: "row" }}
                          spacing={3}
                        >
                          <Box sx={{ width: "130px" }}>
                            <FormikControl
                              control="autocomplete"
                              name="customerDetails.telephoneCountryCode"
                              label="Code"
                              use="telephoneCountryCode"
                              options={telephoneCodes}
                              required
                              defaultValue={getTelephoneCountryCode(
                                formValues?.customerDetails
                                  ?.telephoneCountryCode
                              )}
                            />
                          </Box>
                          <FormikControl
                            control="input"
                            variant="outlined"
                            name="customerDetails.phoneNumber"
                            label="Contact Number"
                            type="number"
                            id="customerDetails.phoneNumber"
                            haveTooltip
                            tooltipText="Enter Your Contact number without country code"
                          />
                        </Stack>

                        <FormikControl
                          control="checkbox"
                          options={noExpiryOptions}
                          name="noExpiry"
                          row
                          externalStyles={styles.checkboxExternalStyles}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formik.setFieldValue("noExpiry", ["true"]);
                            } else {
                              formik.setFieldValue("noExpiry", []);
                            }
                            formik.setFieldValue("linkExpirationDate", null);
                          }}
                        />
                        {(formik.values.noExpiry[0] === "false" ||
                          formik.values.noExpiry[0] === undefined) && (
                          <FormikControl
                            control="datePicker"
                            label="Set Expiry Date"
                            name="linkExpirationDate"
                            required
                            minDate={new Date()}
                            maxDateOption
                            onChange={(val) => {
                              formik.setFieldValue("linkExpirationDate", val);
                            }}
                          />
                        )}
                        <Stack direction="row" spacing={2}>
                          <TransactionButton
                            text="Create payment link"
                            icon={<img src="/doubletick.svg" alt="icon" />}
                            activeState
                            type="submit"
                            loading={loading}
                          />
                          <TransactionButton
                            text="Cancel"
                            onClick={() => {
                              formik.resetForm();
                              return toggleCreatePaymentLink;
                            }}
                          />
                        </Stack>
                      </Stack>
                    </Form>
                  </Box>
                );
              }}
            </Formik>
          </Stack>
        </PageViewBox>
      </Box>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

CreatePaymentLink.propTypes = {
  toggleCreatePaymentLink: PropTypes.func.isRequired,
};

export default CreatePaymentLink;
