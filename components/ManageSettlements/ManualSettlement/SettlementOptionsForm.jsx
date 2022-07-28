import PropTypes from "prop-types";

import { Typography, Stack, Box } from "@mui/material";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import TransactionButton from "../../../atoms/TransactionButton";

import { transferMode, transferVolume } from "./data";

const SettlementOptionsForm = ({ handleNext }) => {
  const initialValues = { transferMode: "", transferVolume: "" };
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
                    Select Transfer Mode
                  </Typography>

                  <Box sx={{ pl: 7, pt: 6 }}>
                    <FormikControl
                      control="radio"
                      name="transferMode"
                      label=""
                      options={transferMode}
                      required
                    />
                  </Box>
                </Stack>
                {formik.values.transferMode !== "" && (
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
                      />
                    </Box>
                  </Stack>
                )}
                {formik.values.transferMode !== "" &&
                  formik.values.transferVolume !== "" && (
                    <Box sx={{ pl: 7, pt: 6, width: "12%" }}>
                      <TransactionButton
                        text="Next"
                        icon={<img src="/doubletick.svg" alt="icon" />}
                        onClick={() => handleNext(formik.values)}
                        activeState={true}
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
