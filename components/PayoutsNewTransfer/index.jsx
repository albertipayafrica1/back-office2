import PropTypes from "prop-types";

import { Divider } from "@mui/material";

import PageViewBox from "../../atoms/PageViewBox";

import SingleTransfer from "./SingleTransfer";
import BulkTransfer from "./BulkTransfer";

const PayoutsNewTransfer = ({ toggleNewTransfer }) => {
  return (
    <PageViewBox>
      <SingleTransfer toggleNewTransfer={toggleNewTransfer} />
      <Divider />
      <BulkTransfer />
    </PageViewBox>
  );
};

PayoutsNewTransfer.propTypes = {
  toggleNewTransfer: PropTypes.func.isRequired,
};

export default PayoutsNewTransfer;
