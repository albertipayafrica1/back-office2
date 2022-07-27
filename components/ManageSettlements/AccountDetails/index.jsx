import { useSelector } from "react-redux";

import { Typography, Stack, Grid, Box, useMediaQuery } from "@mui/material";

import { Formik, Form } from "formik";
import FormikControl from "../../FormikControls/index";

import ChannelDetails from "./ChannelDetails";

import * as styles from "./styles";

const AccountDetails = () => {
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
                    required
                    sx={styles.textField}
                    fastField={false}
                  />
                </Box>
              </Stack>
              <Stack sx={{ pt: 10 }} spacing={2}>
                <Stack sx={{ pl: 5 }} spacing={1}>
                  <Typography
                    variant="subtitle8"
                    sx={{ color: (theme) => theme.colors.lightRed }}
                  >
                    Terms and Conditions
                  </Typography>
                  <Typography variant="subtitle8">
                    Public holidays and weekends are not counted as settlement
                    days. However, any funds acquired during public holidays
                    and/or weekends will be remitted on the next settlement date
                    as per your settings above.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <img src="/infoicon.svg" alt="infoicon" />
                  <Typography variant="subtitle8">
                    Note - To view settlement details for a different currency,
                    switch with the currency dropdown on left sidebar. To edit
                    your settlement Account Details, send an email request to{" "}
                    <span style={{ color: "blue" }}>
                      support@ipayafrica.com
                    </span>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccountDetails;
