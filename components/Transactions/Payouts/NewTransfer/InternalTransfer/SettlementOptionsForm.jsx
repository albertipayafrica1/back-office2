import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { Typography, Stack, Box } from "@mui/material";

import { Formik, Form } from "formik";
import FormikControl from "../../../../FormikControls/index";

import TransactionButton from "../../../../../atoms/TransactionButton";

import { transferVolume } from "./data";

import * as styles from "./styles";

const SettlementOptionsForm = ({ handleNext }) => {
  const nativeCurrency = "KES"; // changes based on country (get it from store)
  const selectedCurrency = useSelector(
    (state) => state?.currency?.globalCurrency
  );
  const initialValues = { transferMode: "", transferVolume: "" };

  if (selectedCurrency !== nativeCurrency) {
    return (
      <Typography variant="subtitle6">
        To top up your Payin Account, kindly select {nativeCurrency} to proceed
      </Typography>
    );
  }
  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {(formik) => {
        return (
          <Form>
            <Stack spacing={8}>
              <Stack spacing={6}>
                <Stack>
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.orange }}
                  >
                    Select Transfer Volume
                  </Typography>
                  <Box sx={{ pl: 7, pt: 6 }}>
                    <FormikControl
                      control="radio"
                      name="transferVolume"
                      label=""
                      options={transferVolume}
                      required
                      externalStyles={styles.radioExternalStyles}
                    />
                  </Box>
                </Stack>

                {formik.values.transferVolume !== "" && (
                  <Box sx={{ pl: 7, pt: 6, width: "12%" }}>
                    <TransactionButton
                      text="Next"
                      icon={<img src="/doubletick.svg" alt="icon" />}
                      onClick={() => handleNext(formik.values)}
                      activeState
                    />
                  </Box>
                )}
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

SettlementOptionsForm.propTypes = {
  handleNext: PropTypes.func.isRequired,
};
export default SettlementOptionsForm;
