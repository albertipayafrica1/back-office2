import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";

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
import NotificationDrawer from "./NotificationDrawer";

import Search from "../../../../atoms/Search";

import UserDetails from "../UserDetails";
import TestMode from "../Testmode";

import { useStyles } from "./styles";
import * as styles from "./styles";

const TopAppBar = ({ handleDrawerToggle, testModeStatus }) => {
  const classes = useStyles();
  const router = useRouter();
  const containerRef = useRef(null);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const [userDetailsComponent, setUserDetailsComponent] = useState(false);

  const handleNotificationDrawer = () => {
    if (userDetailsComponent === true) {
      setUserDetailsComponent(false)
    }
    setOpenNotificationDrawer(!openNotificationDrawer);
  };

  const toggleUserDetailsComponent = () => {
    if (openNotificationDrawer === true) {
      setOpenNotificationDrawer(false)
    }
    setUserDetailsComponent(!userDetailsComponent);
  };

  console.log(router, "router");
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <Box sx={{ backgroundColor: "yellow" }}>
      <TestMode testModeStatus={testModeStatus} />
      <AppBar
        className={`${
          testModeStatus
            ? classes.appBarContainerTestModeOn
            : classes.appBarContainerTestModeOff
        }`}
      >
        <Toolbar sx={{ minHeight: 0 }}>
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
                {router.pathname !== "/dashboard/kyc" && <Search />}
              </Box>

              <Box sx={styles.userDetailsContainer}>
                {/* <Typography sx={styles.HelpText}>Help</Typography> */}

                <Badge badgeContent={0} sx={styles.badge}>
                  <NotificationsActiveIcon
                    onClick={handleNotificationDrawer}
                    sx={styles.notificationIcon}
                  />
                  <NotificationDrawer
                    toggleNotificationDrawer={handleNotificationDrawer}
                    open={openNotificationDrawer}
                    containerRef={containerRef}
                  />
                </Badge>

                <Typography sx={styles.HelpText}>
                  {`Hello, ${user.firstName}`}
                </Typography>
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
