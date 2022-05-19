import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import * as styles from "./styles";
import DrawerWrapper from "./DrawerWrapper";
import TopAppBar from "./AppBar";

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 254;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/** testMode pass true or false */}
      <TopAppBar testModeStatus handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <DrawerWrapper
          testModeStatus // testMode pass true or false
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box sx={styles.childContent}>{children}</Box>
    </Box>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
