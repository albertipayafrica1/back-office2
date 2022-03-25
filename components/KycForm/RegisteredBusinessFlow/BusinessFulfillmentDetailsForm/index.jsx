import { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls";
import CreateAccountFormDiv from "../../../../atoms/CreateAccountFormDiv";
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

const BusinessFulfillmentDetailsForm = () => {
  const [formValues, setFormValues] = useState(null);

  const handleSubmit = (values, formikHelpers) => {};

  const loading = false;

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
                  />
                  <FormikControl
                    control="radio"
                    name="shipProductYourself"
                    label="Do you ship the product yourself"
                    options={shipProductYourself}
                    required
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
  );
};

export default BusinessFulfillmentDetailsForm;
