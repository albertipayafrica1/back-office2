import PropTypes from "prop-types";

import { Box } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import PageViewBox from "../../../atoms/PageViewBox";
import Tabs from "../../../atoms/Tabs";

import POS from "./Pos";

import Header from "./Header";

import * as styles from "./styles";

const AddSubAccounts = ({ toggleAddSubAccounts }) => {
  const icons = [<ReceiptLongIcon sx={styles.iconStyles} />];
  const tabTitle = ["POS"];

  return (
    <Box sx={{ pt: 6 }}>
      <Header closeAddSubAccounts={toggleAddSubAccounts} />
      <PageViewBox>
        <Tabs
          tabTitle={tabTitle}
          positionStyles={styles.positionStyles}
          icons={icons}
        >
          <POS closeAddSubAccounts={toggleAddSubAccounts} />
          <POS closeAddSubAccounts={toggleAddSubAccounts} />
        </Tabs>
      </PageViewBox>
    </Box>
  );
};

AddSubAccounts.propTypes = {
  toggleAddSubAccounts: PropTypes.func.isRequired,
};

export default AddSubAccounts;
