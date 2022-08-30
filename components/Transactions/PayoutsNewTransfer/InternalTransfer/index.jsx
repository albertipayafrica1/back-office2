import { useState } from "react";

import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";
import SettlementOptionsForm from "./SettlementOptionsForm";
import AmountForm from "./AmountForm";
import ConfirmActionDialog from "./ConfirmActionDialog";
import InitiationConfirmationDialog from "./InitiationConfirmationDialog";

const InternalTransfer = () => {
  const [selectedSettlementOptions, setSelectedSettlementOptions] = useState(
    {}
  );
  const [settlementOptionsFormActive, setSettlementOptionsFormActive] =
    useState(true);
  const [amountFormActive, setAmountFormActive] = useState(false);
  const [amountToTransfer, setAmountToTransfer] = useState(false);
  const [openConfirmActionDialog, setOpenConfirmActionDialog] = useState(false);
  const [
    openInitiationConfirmationDialog,
    setOpenInitiationConfirmationDialog,
  ] = useState(false);
  const [progress, setProgress] = useState("0");

  const handleCancel = () => {
    setSettlementOptionsFormActive(true);
    setAmountFormActive(false);
    setOpenConfirmActionDialog(false);
    setOpenInitiationConfirmationDialog(false);
    setProgress("0");
  };
  const handleNext = (settlementOptions) => {
    setSelectedSettlementOptions(settlementOptions);
    setSettlementOptionsFormActive(false);
    setAmountFormActive(true);
    setProgress("33.33");
  };
  const toggleConfirmActionDialog = () => {
    setOpenConfirmActionDialog((prevState) => !prevState);
  };
  const toggleInitiationConfirmationDialog = () => {
    setOpenInitiationConfirmationDialog((prevState) => !prevState);
  };
  const handleSendMoney = (amount) => {
    setProgress("66.66"); // take settlement options from state above
    setAmountToTransfer(amount);
    toggleConfirmActionDialog();
  };
  const handleBack = () => {
    setSettlementOptionsFormActive(true);
    setAmountFormActive(false);
  };

  const handleConfirmTransfer = () => {
    setProgress("100");
    toggleConfirmActionDialog();
    toggleInitiationConfirmationDialog();
  };

  return (
    <Stack spacing={8} sx={{ p: 10 }}>
      <Header progress={progress} handleCancel={handleCancel} />
      {settlementOptionsFormActive && (
        <SettlementOptionsForm handleNext={handleNext} />
      )}
      {amountFormActive && (
        <AmountForm
          handleSendMoney={handleSendMoney}
          handleBack={handleBack}
          settlementOptions={selectedSettlementOptions}
        />
      )}
      <Footer />
      <ConfirmActionDialog
        open={openConfirmActionDialog}
        toggleConfirmActionDialog={toggleConfirmActionDialog}
        handleConfirmTransfer={handleConfirmTransfer}
        amount={amountToTransfer}
      />
      <InitiationConfirmationDialog
        open={openInitiationConfirmationDialog}
        toggleInitiationConfirmationDialog={toggleInitiationConfirmationDialog}
        handleResetAll={handleCancel}
        settlementType={
          selectedSettlementOptions.transferMode === "1"
            ? "Manual Settlement"
            : "Internal Transfer"
        }
      />
    </Stack>
  );
};

export default InternalTransfer;
