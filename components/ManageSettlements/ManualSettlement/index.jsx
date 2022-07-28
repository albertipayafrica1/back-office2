import { useState } from "react";

import { Stack } from "@mui/material";
import Header from "./Header";
import SettlementOptionsForm from "./SettlementOptionsForm";
import AmountForm from "./AmountForm";

const ManualSettlement = () => {
  const [selectedSettlementOptions, setSelectedSettlementOptions] = useState(
    {}
  );
  const [settlementOptionsFormActive, setSettlementOptionsFormActive] =
    useState(true);
  const [amountFormActive, setAmountFormActive] = useState(false);

  const handleCancel = () => {
    setSettlementOptionsFormActive(true);
    setAmountFormActive(false);
  };
  const handleNext = (settlementOptions) => {
    setSelectedSettlementOptions(settlementOptions);
    setSettlementOptionsFormActive(false);
    setAmountFormActive(true);
  };
  const handleSendMoney = () => {};
  const handleBack = () => {
    setSettlementOptionsFormActive(true);
    setAmountFormActive(false);
  };
  return (
    <Stack spacing={8} sx={{ p: 10 }}>
      <Header progress="10" handleCancel={handleCancel} />
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
    </Stack>
  );
};

export default ManualSettlement;
