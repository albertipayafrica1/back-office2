import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";
import Cookies from "js-cookie";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";

import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
import MuiAlert from "../../../../atoms/MuiAlert";

import { businessFulfillmentDetails } from "../../../../utils/formValidations/kyc/registeredBusinessFlow/businessFulfillmentDetails";

import {
  sellPhysicalGoodsOrServices,
  shipProductYourself,
  fulfillmentPeriod,
} from "./data";

import * as styles from "./styles";

const initialValues = {
  sellPhysicalGoodsOrServices: "",
  shipProductYourself: "",
  fulfillmentPeriod: "",
};

const BusinessFulfillmentDetailsForm = ({ handleNextStep }) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleSubmit = (values, formikHelpers) => {
    setLoading(true);
    setAlert({ type: "", message: "" });
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/kyc/fulfillment-details`,
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
            message: "Fulfillment Details Updated Successfully!",
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
          // setErrors({ ...errors, generic: error.response.data.response });

          setAlert({ type: "error", message: "Something Went Wrong" });
          console.log(error.response, "second if else");
        } else {
          setAlert({ type: "error", message: "Something Went Wrong" });
          // setErrors({ generic: "Something went wrong" });
          console.log(error, "third if else");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const savedValues = {
      // this you get it from api call
      sellPhysicalGoodsOrServices: "",
      shipProductYourself: "1",
      fulfillmentPeriod: "",
    };
    setFormValues(savedValues);
  }, []);
  return (
    <>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={businessFulfillmentDetails}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          console.log(formik.errors, "errors");
          return (
            <Form>
              <Stack sx={styles.formContainer} spacing={8}>
                <Typography variant="subtitle1">
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
                    <Typography variant="subtitle3">
                      On average, how long after paying will your customers
                      typically receive their goods or services?
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
