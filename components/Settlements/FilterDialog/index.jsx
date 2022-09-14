import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery, Button } from "@mui/material";

import { Form, Formik } from "formik";
import FormikControl from "../../FormikControls";

import Dialog from "../../../atoms/Dialog";

import { paymentChannelOptions } from "./data";
import { filterDialog } from "../../../utils/formValidations/settlements/filterDialog";

import * as styles from "./styles";

const FilterDialog = ({ open, toggleFilterDialog }) => {
  const matchesWidth = useMediaQuery("(min-width:900px)");
  const matchesHeight = useMediaQuery("(min-height:649px)");

  const router = useRouter();

  const initialValues = {
    transactionId: "",
    settlmentChannel: "",
    dateRange: [null, null],
    lastDays: "",
    status: "",
    settlementType: "",
  };

  const handleSubmit = (values) => {
    toggleFilterDialog();
    router.push(
      {
        pathname: `${router.pathname}`,
        query: {
          page: 0,
          transactionId: values.transactionId,
          settlmentChannel: values.settlementChannel,
          dateRange: values.dateRange,
          lastDays: values.lastDays,
          status: values.status,
          settlementType: values.settlementType,
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
                        name="settlementChannel"
                        label="Settlement Channel"
                        type="text"
                        select
                        selectItem={paymentChannelOptions}
                        id="settlementChannel"
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
                        label="Status"
                        name="status"
                        variant="outlined"
                        type="text"
                        id="Status"
                        shrink
                        placeholder=""
                        select
                        selectItem={paymentChannelOptions}
                      />
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="settlementType"
                        label="Settlement Type"
                        type="text"
                        id="settlementType"
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
