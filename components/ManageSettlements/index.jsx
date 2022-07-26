import React from "react";

import { Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WatchIcon from "@mui/icons-material/Watch";
import DetailsIcon from "@mui/icons-material/Details";

import PageViewBox from "../../atoms/PageViewBox";
import Tabs from "../../atoms/Tabs";

import AccountDetails from "./AccountDetails";
import ScheduledSettlement from "./ScheduledSettlement";
import ManualSettlement from "./ManualSettlement";

import * as styles from "./styles";

const ManageSettlements = () => {
  const icons = [
    <CalendarTodayIcon sx={styles.iconStyles} />,
    <WatchIcon sx={styles.iconStyles} />,
    <DetailsIcon sx={styles.iconStyles} />,
  ];
  const tabTitle = [
    "Account Details",
    "Scheduled Settlements",
    "Manual Settlements",
  ];

  return (
    <Box sx={{ p: 10 }}>
      <PageViewBox>
        <Box sx={{ pt: 6 }}>
          <Tabs
            tabTitle={tabTitle}
            positionStyles={styles.positionStyles}
            icons={icons}
          >
            <AccountDetails />
            <ScheduledSettlement />
            <ManualSettlement />
          </Tabs>
        </Box>
      </PageViewBox>
    </Box>
  );
};

export default ManageSettlements;
