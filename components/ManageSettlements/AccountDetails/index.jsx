import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import ChannelDetails from "./ChannelDetails";

import * as styles from "./styles";

const AccountDetails = ({ footer }) => {
  const globalCurrency = useSelector((state) => state.currency.globalCurrency);
  const matches = useMediaQuery("(min-width:600px)");
  const initialValues = { payMeVia: "" };
  return (
    <Formik initialValues={initialValues} enableReinitialize>
      {(formik) => {
        return (
          <Form>
            <Stack spacing={8} sx={{ p: 10 }}>
              <Stack spacing={6}>
                <Typography
                  variant="subtitle5"
                  sx={{ color: (theme) => theme.colors.blue }}
                >
                  1. Settlement Channel ({globalCurrency})
                </Typography>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 8, md: 3 }}
                >
                  <Box sx={matches ? { width: "400px" } : { width: "100%" }}>
                    <FormikControl
                      control="input"
                      label="Pay me Via"
                      name="settlementChannel"
                      variant="outlined"
                      type="text"
                      id="settlementChannel"
                      sx={styles.textField}
                      disabled
                    />
                  </Box>

                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={{ xs: 1, md: 8 }}
                  >
                    <Box sx={matches ? { width: "50px" } : { display: "none" }}>
                      <img src="/Arrow2.svg" alt="arrow" />
                    </Box>
                    <Typography
                      variant="subtitle8"
                      sx={{ color: (theme) => theme.colors.blue }}
                    >
                      Withdraw your funds through EFT, RTGS, PESALINK, Airtel
                      Money, M-PESA, MPESA PAYBILL, MPESA TILL, iPay Merchant
                      Transfer, or Internal Transfer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack sx={{ width: "100%" }}>
                <Typography
                  variant="subtitle5"
                  sx={{ color: (theme) => theme.colors.orange, mb: 6 }}
                >
                  Channel Details
                </Typography>
                <ChannelDetails name="bank" />
              </Stack>

              <Stack spacing={6}>
                <Typography
                  variant="subtitle5"
                  sx={{ color: (theme) => theme.colors.blue }}
                >
                  2. Settlement Release level ({globalCurrency})
                </Typography>
                <Box sx={matches ? { width: "290px" } : { width: "100%" }}>
                  <FormikControl
                    control="input"
                    label="Settlement Release Level"
                    name="password"
                    variant="outlined"
                    type="text"
                    id="releaseLevel"
                    sx={styles.textField}
                    disabled
                  />
                </Box>
              </Stack>
              {footer}
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

AccountDetails.propTypes = {
  footer: PropTypes.node.isRequired,
};

export default AccountDetails;
