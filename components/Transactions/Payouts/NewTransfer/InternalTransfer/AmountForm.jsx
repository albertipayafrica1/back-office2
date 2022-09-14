// Todo
// make a check with forex when amount changes or currency not equal to bank account currency or currency not equal to native currency
// add loader on forex part

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import { Typography, Stack, Box, useMediaQuery } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";

import { Formik, Form } from "formik";
import FormikControl from "../../../../FormikControls/index";

import TransactionButton from "../../../../../atoms/TransactionButton";
import MuiSwitch from "../../../../../atoms/MuiSwitch";

import { transferMode, transferVolume } from "./data";

import { amountChecker } from "../../../../../utils/formValidations/settlements/manualSettlement/amountChecker";
import colors from "../../../../../styles/colors";

import * as styles from "./styles";

const shapeSettlementOptions = (settlementOptions) => {
  const transferModeKey = transferMode[0].key;
  let transferVolumeKey = "";

  if (settlementOptions.transferVolume === "1") {
    transferVolumeKey = transferVolume[0].key;
  } else {
    transferVolumeKey = transferVolume[1].key;
  }

  return [
    { key: transferModeKey, value: "1" },
    { key: transferVolumeKey, value: "2" },
  ];
};

const AmountForm = ({ settlementOptions, handleSendMoney, handleBack }) => {
  const initialValues = { settlementOptions: ["1", "2"] };
  const partialAmountInitialValues = { partialAmount: "" };

  const nativeCurrency = "KES"; // changes based on country (get it from store)
  const payoutBalance = "1000"; // get payout balance

  const [switchChecked, setSwitchChecked] = useState(false);
  const [amountToTransfer, setAmountToTransfer] = useState("");
  const selectedCurrency = useSelector(
    (state) => state?.currency?.globalCurrency
  );
  const matches = useMediaQuery("(min-width:600px)");

  const toggleSwitch = () => {
    setSwitchChecked((prevState) => !prevState);
  };

  useEffect(() => {
    if (settlementOptions.transferVolume === "1") {
      setAmountToTransfer("100");
    }
  }, []);

  // useEffect(() => {}, [amountToTransfer]); // forex conversion

  if (selectedCurrency !== nativeCurrency) {
    return (
      <Typography variant="subtitle6">
        To top up your Payin Account, kindly select {nativeCurrency} to proceed
      </Typography>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={10}>
        <ArrowBack
          sx={{ color: (theme) => theme.colors.blue, cursor: "pointer" }}
          onClick={handleBack}
        />
        <Formik initialValues={initialValues} enableReinitialize>
          {(formik) => {
            return (
              <Form>
                <FormikControl
                  control="checkbox"
                  options={shapeSettlementOptions(settlementOptions)}
                  name="settlementOptions"
                  row
                  disabled
                  externalStyles={styles.checkboxExternalStyles}
                />
              </Form>
            );
          }}
        </Formik>
      </Stack>
      <Stack sx={{ pl: 10 }} spacing={8}>
        {settlementOptions.transferVolume === "1" && (
          <Typography variant="subtitle6">
            You are about to transfer the Full amount in your Payin account{" "}
            <span style={{ color: colors.orange }}>{selectedCurrency}</span>{" "}
            {amountToTransfer}
          </Typography>
        )}

        {settlementOptions.transferVolume === "2" && (
          <>
            <Typography variant="subtitle6">
              Your Payout Account balance is:{" "}
              <span style={{ color: colors.orange }}>{selectedCurrency}</span>{" "}
              23,000.00
            </Typography>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Typography variant="subtitle6">
                Enter amount you wish to transfer (
                <span style={{ color: colors.orange }}>{selectedCurrency}</span>
                )
              </Typography>
              <Formik
                validationSchema={amountChecker(payoutBalance)}
                initialValues={partialAmountInitialValues}
                enableReinitialize
              >
                {(formik) => {
                  return (
                    <Form>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="partialAmount"
                        onChange={(e) => {
                          formik.setFieldValue("partialAmount", e.target.value);
                          setAmountToTransfer(e.target.value);
                        }}
                        label="Amount"
                        type="number"
                        id="amount"
                        required
                      />
                    </Form>
                  );
                }}
              </Formik>
            </Stack>
          </>
        )}

        <Stack direction="row" spacing={10} alignItems="center">
          <Typography variant="subtitle6">
            Initiate Internal Transfer
          </Typography>
          <MuiSwitch
            checked={switchChecked}
            toggleSwitch={toggleSwitch}
            disabled={amountToTransfer === ""}
          />
        </Stack>
        {switchChecked && settlementOptions.transferVolume === "2" && (
          <Typography variant="subtitle6">
            You are about to transfer{" "}
            <span style={{ color: colors.orange }}>{selectedCurrency}</span>{" "}
            {amountToTransfer} from your payout account
          </Typography>
        )}
        {switchChecked && (
          <Box sx={{ pt: 6, width: `${matches ? "15%" : "50%"}` }}>
            <TransactionButton
              text="Send money"
              icon={<img src="/doubletick.svg" alt="icon" />}
              onClick={() => handleSendMoney(amountToTransfer)}
              activeState
              disabled={
                amountToTransfer === "" ||
                parseInt(amountToTransfer, 10) > parseInt(payoutBalance, 10)
              }
            />
          </Box>
        )}
      </Stack>
    </>
  );
};

AmountForm.propTypes = {
  settlementOptions: PropTypes.shape({
    transferMode: PropTypes.string.isRequired,
    transferVolume: PropTypes.string.isRequired,
  }).isRequired,
  handleSendMoney: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};
export default AmountForm;
