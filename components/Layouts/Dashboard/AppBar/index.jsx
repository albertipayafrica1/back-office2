import PropTypes from "prop-types";
import { useState } from "react";
import Image from "next/image";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useStyles } from "./styles";
import * as styles from "./styles";
import UserDetails from "../UserDetails";
import TestMode from "../Testmode";

const TopAppBar = ({ handleDrawerToggle, testModeStatus }) => {
  const [userDetailsComponent, setUserDetailsComponent] = useState(false);

  const toggleUserDetailsComponent = () => {
    setUserDetailsComponent(!userDetailsComponent);
  };

  const classes = useStyles();

  return (
    <Box>
      <TestMode testModeStatus={testModeStatus} />
      <AppBar
        className={`${
          testModeStatus
            ? classes.appBarContainerTestModeOn
            : classes.appBarContainerTestModeOff
        }`}
      >
        <Toolbar>
          <Box sx={styles.appBarContainer}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={styles.iconButton}
            >
              <MenuIcon className={classes.closeIcon} />
            </IconButton>

            <img src="/LOGO.svg" alt="logo" style={styles.logo} />

            <Box sx={styles.searchUserDetailsContainer}>
              <Box sx={styles.searchContainer}>
                {/** place search component hear widrh 100% height%  */}
              </Box>

              <Box sx={styles.userDetailsContainer}>
                {/* <Typography sx={styles.HelpText}>Help</Typography>
                <Badge badgeContent={0} sx={styles.badge}>
                  <NotificationsActiveIcon sx={styles.notificationIcon} />
                </Badge> */}

                <Typography sx={styles.HelpText}>Hello, Diana</Typography>
                <Box
                  onClick={toggleUserDetailsComponent}
                  sx={styles.userIconContainer}
                >
                  <Image src="/usericon.svg" width={16.15} height={16.15} />

                  <Image src="/down arrow.svg" width="8.88px" height="8.88px" />
                </Box>
              </Box>
            </Box>
            <UserDetails status={userDetailsComponent} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopAppBar;

TopAppBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  testModeStatus: PropTypes.bool.isRequired,
};
