import PropTypes from "prop-types";

import { Box } from "@mui/material";

import Tabs from "../../../../atoms/Tabs";
import PageViewBox from "../../../../atoms/PageViewBox";

import SingleTransfer from "./SingleTransfer";
import BulkTransfer from "./BulkTransfer";
import BillPayment from "./BillPayment";
import InternalTransfer from "./InternalTransfer";

const PayoutsNewTransfer = ({ toggleNewTransfer }) => {
  const tabTitle = [
    "Single Transfer",
    "Bulk Transfer",
    "Internal Transfer",
    "Bill Payment",
    "Payout Favorites",
  ];

  const positionStyles = {
    position: "sticky",
    top: { xs: 105, sm: 108, md: 109 },
    backgroundColor: (theme) => theme.colors.mono1,
    width: "100%",
    zIndex: 999,
    height: "60px",
  };

  return (
    <PageViewBox>
      <Box sx={{ pt: 5 }}>
        <Tabs tabTitle={tabTitle} positionStyles={positionStyles}>
          <SingleTransfer toggleNewTransfer={toggleNewTransfer} />
          <BulkTransfer />
          <InternalTransfer toggleNewTransfer={toggleNewTransfer} />
          <BillPayment />
          <SingleTransfer toggleNewTransfer={toggleNewTransfer} />
        </Tabs>
      </Box>
    </PageViewBox>
  );
};

PayoutsNewTransfer.propTypes = {
  toggleNewTransfer: PropTypes.func.isRequired,
};

export default PayoutsNewTransfer;
