import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import { Form, Formik } from "formik";
import FormikControl from "../../FormikControls";

import Dialog from "../../../atoms/Dialog";

import { paymentChannelOptions } from "./data";
import { filterDialog } from "../../../utils/formValidations/paymentLink/filterDialog";

import * as styles from "./styles";

const FilterDialog = ({ open, toggleFilterDialog }) => {
  const matchesWidth = useMediaQuery("(min-width:900px)");
  const matchesHeight = useMediaQuery("(min-height:649px)");

  const router = useRouter();

  const initialValues = {
    linkId: "",
    email: "",
    telephone: "",
    lastDays: "",
    description: "",
    status: "",
    amount: "",
    orderId: "",
    dateCreated: [null, null],
  };

  const handleSubmit = (values) => {
    toggleFilterDialog();
    console.log(values, "vv");
    router.push(
      {
        pathname: `${router.pathname}`,
        query: {
          page: 0,
          linkId: values.linkId,
          email: values.email,
          telephone: values.telephone,
          lastDays: values.lastDays,
          description: values.description,
          status: values.status,
          amount: values.amount,
          orderId: values.orderId,
          dateCreated: values.dateCreated[0] + values.dateCreated[1],
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
                        label="Link Id"
                        name="linkId"
                        variant="outlined"
                        type="text"
                        id="linkId"
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
                    </Stack>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="telephone"
                        label="Telephone"
                        type="number"
                        id="telephone"
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
                        label="Description"
                        name="description"
                        variant="outlined"
                        type="text"
                        id="description"
                        shrink
                        placeholder=""
                      />
                      <FormikControl
                        control="input"
                        label="Status"
                        name="status"
                        variant="outlined"
                        type="text"
                        id="status"
                        select
                        selectItem={paymentChannelOptions}
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
                        name="amount"
                        label="Amount"
                        type="number"
                        id="amount"
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
                      sx={matchesWidth ? { width: "50%" } : { width: "100%" }}
                    >
                      <FormikControl
                        control="dateRangePicker"
                        labelStart="From"
                        labelEnd="To"
                        name="dateCreated"
                        onChange={(val) => {
                          formik.setFieldValue("dateCreated", val);
                        }}
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
