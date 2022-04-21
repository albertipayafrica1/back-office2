import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { useStyles } from "./styles";
import DrawerWrapper from "./DrawerWrapper";
import TopAppBar from "./AppBar";

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const drawerWidth = 250;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <TopAppBar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <DrawerWrapper
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Box>
      <Box className={classes.childContent}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
};
