import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import {
  Typography,
  Stack,
  Box,
  useMediaQuery,
  IconButton,
  Icon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/CancelOutlined";

import { Formik, Form } from "formik";
import FormikControl from "../../../FormikControls/index";

import MuiToolTip from "../../../../atoms/MuiToolTip";
import TransactionButton from "../../../../atoms/TransactionButton";

import ChannelDetails from "./ChannelDetails";

import * as styles from "./styles";

const AccountDetails = ({ footer }) => {
  const [editMode, setEditMode] = useState(false);
  const globalCurrency = useSelector((state) => state.currency.globalCurrency);
  const matches = useMediaQuery("(min-width:600px)");
  const initialValues = { payMeVia: "" };

  const editModeHandler = (formik) => {
    console.log(formik, "editmode");
    setEditMode((prevState) => !prevState);
    formik.resetForm();
    // formik.unregisterField("payMeVia");
    // formik.setTouched("payMeVia");
  };
  return (
    <Formik initialValues={initialValues} enableReinitialize validateOnBlur>
      {(formik) => {
        console.log("reset ho gaya");
        return (
          <Form>
            <Stack spacing={8} sx={{ p: 10 }}>
              <Stack spacing={6}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="subtitle5"
                    sx={{ color: (theme) => theme.colors.blue }}
                  >
                    1. Settlement Channel ({globalCurrency})
                  </Typography>
                  <MuiToolTip
                    placement="right-start"
                    title={
                      editMode ? "edit mode activated" : "edit mode deactivated"
                    }
                  >
                    <IconButton onClick={() => editModeHandler(formik)}>
                      <EditIcon
                        sx={{
                          color: (theme) => theme.colors.blue,
                          fontSize: "20px",
                        }}
                      />
                    </IconButton>
                  </MuiToolTip>
                </Stack>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={{ xs: 8, md: 3 }}
                >
                  <Box sx={matches ? { width: "400px" } : { width: "100%" }}>
                    <FormikControl
                      control="select"
                      select
                      selectItem={[]}
                      label="Pay me Via"
                      name="payMeVia"
                      variant="outlined"
                      type="text"
                      id="payMeVia"
                      sx={styles.textField}
                      disabled={!editMode}
                      autoFocus={!editMode}
                      fastField={false}
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
                <ChannelDetails name="bank" disabled={!editMode} />
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
                    name="releaseLevel"
                    variant="outlined"
                    type="text"
                    id="releaseLevel"
                    sx={styles.textField}
                    disabled={!editMode}
                    fastField={false}
                  />
                </Box>
                {editMode && (
                  <Stack direction="row" spacing={5} alignItems="center">
                    <Stack sx={{ pt: 4, width: `${matches ? "15%" : "50%"}` }}>
                      <TransactionButton
                        text="Save Changes"
                        icon={<SaveIcon sx={{ fontSize: "15px" }} />}
                        // onClick={saveHandler}
                        activeState
                        disabled={!formik.isValid}
                      />
                    </Stack>
                    <Stack sx={{ pt: 4, width: `${matches ? "15%" : "50%"}` }}>
                      <TransactionButton
                        text="Cancel Editing"
                        icon={<CancelIcon sx={{ fontSize: "15px" }} />}
                        onClick={() => {
                          editModeHandler(formik);
                        }}
                      />
                    </Stack>
                  </Stack>
                )}
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
