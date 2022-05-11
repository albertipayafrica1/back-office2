import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Typography, Stack, Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import FormikControl from "../FormikControls";

import Dialog from "../../atoms/Dialog";

import { paymentChannelOptions } from "./data";

import * as styles from "./styles";

const FilterDialog = ({ open, toggleBalanceDialog, name }) => {
  const [formValues, setFormValues] = useState({
    transactionId: "",
    paymentChannel: "",
    orderId: "",
    lastDays: "",
    email: "",
    category: "",
    merchantRef: "",
    telephone: "",
    dateRange: "",
    accountId: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [captchaToken, setCaptchaToken] = useState("");
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const handleCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  const initialValues = {
    // transactionId: "",
    paymentChannel: "",
    orderId: "",
    lastDays: "",
    email: "",
    category: "",
    merchantRef: "",
    telephone: "",
    dateRange: "",
    accountId: "",
  };

  return (
    <div>
      <Dialog
        open
        onClose={toggleBalanceDialog}
        backDropVisible={false}
        paperPropsStyling={{ position: "absolute", width: "3000px" }}
      >
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.blue, ml: 5 }}
        >
          FILTER BY
        </Typography>
        <Formik
          initialValues={initialValues}
          // validationSchema={createAccount}
          // onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            console.log(formik.errors, "fork");
            return (
              <Form>
                <Stack sx={styles.formContainer} spacing={8}>
                  <Stack direction="column" spacing={2}>
                    <Stack
                      direction="row"
                      spacing={7}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        label="Transaction Id"
                        name="transactionId"
                        variant="outlined"
                        type="text"
                        id="transactionId"
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="paymentChannel"
                        label="Payment Channel"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="paymentChannel"
                      />
                      <FormikControl
                        control="input"
                        label="Order Id"
                        name="orderId"
                        variant="outlined"
                        type="text"
                        id="orderId"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={7}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="lastDays"
                        label="Last No. Of Days"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="lastDays"
                      />
                      <FormikControl
                        control="input"
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="text"
                        id="email"
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="category"
                        label="Category"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="category"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={7}
                      justifyContent="space-between"
                      sx={{ width: "65%" }}
                    >
                      <FormikControl
                        control="input"
                        label="Merchant Ref."
                        name="merchantRef"
                        variant="outlined"
                        type="text"
                        id="merchantRef"
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="telephone"
                        label="Telephone"
                        type="text"
                        id="telephone"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={7}
                      justifyContent="space-between"
                      sx={{ width: "65%" }}
                    >
                      <FormikControl
                        control="input"
                        label="Date Range"
                        name="dateRange"
                        variant="outlined"
                        type="text"
                        id="dateRange"
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="accountId"
                        label="Account Id"
                        type="text"
                        id="accountId"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={7}
                      justifyContent="space-between"
                    />
                    <Stack direction="row" justifyContent="space-between">
                      <Button
                        variant="text"
                        sx={styles.clearButton}
                        classes={{ root: { padding: 0 } }}
                      >
                        <Typography variant="subtitle5">
                          Clear All Filters
                        </Typography>
                      </Button>
                      <Stack direction="row" justifyContent="space-between">
                        <Button variant="text" sx={styles.cancelButton}>
                          <Typography variant="subtitle5">Cancel</Typography>
                        </Button>
                        <Button
                          loading={loading}
                          disableRipple
                          variant="text"
                          type="submit"
                          sx={styles.applyButton}
                        >
                          <Typography variant="subtitle5">Apply</Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
};

FilterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleBalanceDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default FilterDialog;
