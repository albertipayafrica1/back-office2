import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import { Form, Formik } from "formik";
import FormikControl from "../../../FormikControls";

import Dialog from "../../../../atoms/Dialog";

import { paymentChannelOptions } from "./data";
import { filterDialog } from "../../../../utils/formValidations/transactions/billing/filterDialog";

import * as styles from "./styles";

const FilterDialog = ({ open, toggleFilterDialog }) => {
  const matchesWidth = useMediaQuery("(min-width:900px)");
  const matchesHeight = useMediaQuery("(min-height:649px)");

  const router = useRouter();

  const initialValues = {
    transactionId: "",
    billerName: "",
    account: "",
    lastDays: "",
    amount: "",
    billerCategory: "",
    earnings: "",
    billerRef: "",
    dateRange: [null, null],
    status: "",
  };

  const handleSubmit = (values) => {
    toggleFilterDialog();
    router.push(
      {
        pathname: `${router.pathname}`,
        query: {
          pid: "billing",
          page: 0,
          transactionId: values.transactionId,
          billerName: values.billerName,
          account: values.account,
          lastDays: values.lastDays,
          amount: values.amount,
          billerCategory: values.billerCategory,
          earnings: values.earnings,
          billerRef: values.billerRef,
          dateRange: values.dateRange,
          status: values.status,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
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
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => {
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
                        name="billerName"
                        label="Biller Name"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="billerName"
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
                        label="Account"
                        name="account"
                        variant="outlined"
                        type="text"
                        id="account"
                        shrink
                        placeholder=""
                      />
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
                    </Stack>

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        label="Amount"
                        name="amount"
                        variant="outlined"
                        type="number"
                        id="amount"
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="billerCategory"
                        label="Biller Category"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="billerCategory"
                        shrink
                        placeholder="primary"
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
                        name="earnings"
                        label="Earnings"
                        type="number"
                        id="earnings"
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        label="Biller Reference"
                        name="billerRef"
                        variant="outlined"
                        type="text"
                        id="billerRef"
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
                        name="status"
                        label="Status"
                        type="text"
                        id="status"
                        shrink
                        placeholder=""
                        select
                        selectItem={paymentChannelOptions}
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
                          component="button"
                          type="submit"
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
};
export default FilterDialog;
