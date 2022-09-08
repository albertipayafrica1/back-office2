import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { Box, Stack } from "@mui/material";

import { Formik, Form } from "formik";

import FormikControl from "../../FormikControls/index";
import PageViewBox from "../../../atoms/PageViewBox";

import Header from "./Header";

import { telephoneCodes } from "../../../utils/data";
import { getTelephoneCountryCode } from "../../../utils/countryOfOperation";
import {
  changeAmountOptions,
  noExpiryOptions,
  recurringPaymentOptions,
  paymentReminderOptions,
} from "./data";

import * as styles from "./styles";

const initialValues = {
  currency: "",
  amount: "",
  changeAmount: [],
  paymentDescription: "",
  orderId: "",
  linkId: "",
  customerDetails: {
    name: "",
    email: "",
    telephoneCountryCode: "KE",
    phoneNumber: "",
  },
  recurringPayment: [],
  paymentReminder: "",
  noExpiry: [],
  linkExpirationDate: null,
};
const CreatePaymentLink = ({ toggleCreatePaymentLink }) => {
  const [formValues, setFormValues] = useState(null);

  return (
    <Box sx={{ p: 15 }}>
      <PageViewBox>
        <Stack spacing={5} sx={{ pt: 10 }}>
          <Header toggleCreatePaymentLink={toggleCreatePaymentLink} />

          <Formik
            initialValues={initialValues || formValues}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Box sx={{ pl: 35, pr: 35, pb: 8 }}>
                  <Form>
                    <Stack spacing={3}>
                      <FormikControl
                        control="input"
                        label="Amount In KES"
                        placholder="0"
                        name="amount"
                        variant="outlined"
                        type="number"
                        id="amount"
                        shrink
                      />
                      <FormikControl
                        control="checkbox"
                        options={changeAmountOptions}
                        name="changeAmount"
                        row
                        externalStyles={styles.checkboxExternalStyles}
                      />
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
                        control="input"
                        label="Order Id"
                        name="orderId"
                        variant="outlined"
                        type="text"
                        id="orderId"
                        placeholder="xxxx"
                        disabled
                        shrink
                      />
                      <FormikControl
                        control="input"
                        label="Link Id"
                        name="linkId"
                        variant="outlined"
                        type="text"
                        id="linkId"
                        placeholder="xxxx"
                        disabled
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
                              formValues?.customerDetails?.telephoneCountryCode
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
                          required
                          haveTooltip
                          tooltipText="Enter Your Contact number without country code"
                        />
                      </Stack>
                      <FormikControl
                        control="checkbox"
                        options={recurringPaymentOptions}
                        name="recurringPayment"
                        row
                        externalStyles={styles.checkboxExternalStyles}
                      />
                      {formik.values.recurringPayment[0] === "true" && (
                        <>
                          <FormikControl
                            control="select"
                            variant="outlined"
                            name="paymentReminder"
                            label="Send payment reminder"
                            type="text"
                            select
                            selectItem={paymentReminderOptions}
                            id="title"
                            required
                          />

                          <FormikControl
                            control="checkbox"
                            options={noExpiryOptions}
                            name="noExpiry"
                            row
                            externalStyles={styles.checkboxExternalStyles}
                          />
                          <FormikControl
                            control="datePicker"
                            label="Date Of Link Expiry"
                            name="linkExpirationDate"
                            required
                            minDate={new Date()}
                            maxDateOption
                            onChange={(val) => {
                              formik.setFieldValue("linkExpirationDate", val);
                            }}
                          />
                        </>
                      )}
                    </Stack>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Stack>
      </PageViewBox>
    </Box>
  );
};

CreatePaymentLink.propTypes = {
  toggleCreatePaymentLink: PropTypes.func.isRequired,
};

export default CreatePaymentLink;
