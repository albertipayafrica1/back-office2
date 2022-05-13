import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import { Form, Formik } from "formik";
import FormikControl from "../FormikControls";

import Dialog from "../../atoms/Dialog";

import { paymentChannelOptions } from "./data";
import { filterDialog } from "../../utils/formValidations/filterDialog";

import * as styles from "./styles";

const FilterDialog = ({ open, toggleFilterDialog, name }) => {
  const matchesWidth = useMediaQuery("(min-width:900px)");
  const matchesHeight = useMediaQuery("(min-height:649px)");

  const [formValues, setFormValues] = useState({
    transactionId: "",
    paymentChannel: "",
    orderId: "",
    lastDays: "",
    email: "",
    category: "",
    merchantRef: "",
    telephone: "",
    dateRange: [null, null],
    accountId: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const initialValues = {
    transactionId: "",
    paymentChannel: "",
    orderId: "",
    lastDays: "",
    email: "",
    category: "",
    merchantRef: "",
    telephone: "",
    dateRange: [null, null],
    accountId: "",
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleFilterDialog}
        backDropVisible={false}
        paperPropsStyling={
          matchesWidth && matchesHeight
            ? styles.paperPropsStylingLaptop
            : styles.paperPropsStylingMobile
        }
      >
        <Typography
          variant="subtitle5"
          sx={{ color: (theme) => theme.colors.blue, ml: 5 }}
        >
          FILTER BY
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={filterDialog}
          // onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
            // console.log(formik.errors, "fork");
            // console.log(formik.values, "values");
            return (
              <Form>
                <Stack sx={styles.formContainer} spacing={8}>
                  <Stack direction="column" spacing={2}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        label="Transaction Id"
                        name="transactionId"
                        variant="outlined"
                        type="text"
                        id="transactionId"
                        shrink
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
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        label="Order Id"
                        name="orderId"
                        variant="outlined"
                        type="text"
                        id="orderId"
                        shrink
                        placeholder=""
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
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
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="text"
                        id="email"
                        shrink
                        placeholder=""
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
                        shrink
                        placeholder="primary"
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                      sx={matchesWidth ? { width: "66%" } : { width: "100%" }}
                    >
                      <FormikControl
                        control="input"
                        label="Merchant Ref."
                        name="merchantRef"
                        variant="outlined"
                        type="text"
                        id="merchantRef"
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="telephone"
                        label="Telephone"
                        type="text"
                        id="telephone"
                        shrink
                        placeholder=""
                      />
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                      sx={matchesWidth ? { width: "66%" } : { width: "100%" }}
                    >
                      <FormikControl
                        control="dateRangePicker"
                        labelStart="From"
                        labelEnd="To"
                        name="dateRange"
                        onChange={(val) => {
                          formik.setFieldValue("dateRange", val);
                        }}
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="accountId"
                        label="Account Id"
                        type="text"
                        id="accountId"
                        shrink
                        placeholder=""
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ pt: 5 }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle5"
                          sx={styles.clearButton}
                          onClick={() => {
                            formik.resetForm();
                          }}
                        >
                          Clear All Filters
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle5"
                          sx={styles.cancelButton}
                          onClick={toggleFilterDialog}
                        >
                          Cancel
                        </Typography>

                        <Typography
                          variant="subtitle5"
                          sx={styles.applyButton}
                          onClick={() => {}}
                        >
                          Apply
                        </Typography>
                      </Box>
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
  toggleFilterDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default FilterDialog;
