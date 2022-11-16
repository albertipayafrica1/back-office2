import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";
import Loader from "../../../../atoms/Loader";

import { businessFulfillmentDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessFulfillmentDetails";

import {
  sellPhysicalGoodsOrServices,
  shipProductYourself,
  fulfillmentPeriod,
} from "./data";

import { fetchKycStatusSuccess } from "../../../../redux";

import * as styles from "./styles";

const initialValues = {
  sellPhysicalGoodsOrServices: "",
  shipProductYourself: "",
  fulfillmentPeriod: "",
};

const BusinessFulfillmentDetailsForm = ({ handleNextStep }) => {
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
    console.log("here");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/${companyRef}/fulfillment-details`,
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
            message: "Fulfillment Details Updated Successfully!",
          });
          setLoading(false);
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
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/${companyRef}/fulfillment-details`,
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
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={businessFulfillmentDetails}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form>
              <Stack spacing={8}>
                <Typography variant="subtitle1" sx={{ mt: 5, mb: 2 }}>
                  Tell us how you provide products or services
                </Typography>
                <CreateAccountFormDiv topLabel="Business Fulfillment Details">
                  <Stack direction="column" spacing={2}>
                    <FormikControl
                      control="radio"
                      name="sellPhysicalGoodsOrServices"
                      label="Do You Sell Physical Goods or Services"
                      options={sellPhysicalGoodsOrServices}
                      required
                      row
                    />
                    <FormikControl
                      control="radio"
                      name="shipProductYourself"
                      label="Do you ship the product yourself"
                      options={shipProductYourself}
                      required
                      row
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: (theme) => theme.colors.mono10,
                        paddingBottom: "10px",
                      }}
                    >
                      On average, how long after paying will your customers
                      typically receive their goods or services?
                      <sup>*</sup>
                    </Typography>

                    <FormikControl
                      control="input"
                      label="Fulfillment Period"
                      name="fulfillmentPeriod"
                      variant="outlined"
                      type="text"
                      id="fulfillmentPeriod"
                      required
                      select
                      selectItem={fulfillmentPeriod}
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
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

BusinessFulfillmentDetailsForm.propTypes = {
  handleNextStep: PropTypes.func.isRequired,
};

export default BusinessFulfillmentDetailsForm;
