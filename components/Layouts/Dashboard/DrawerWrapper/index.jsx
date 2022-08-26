import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import {
  Drawer,
  Typography,
  Button,
  LinearProgress,
  Divider,
  Box,
} from "@mui/material";

import SelectCurrencies from "../SelectCurrencies";

import MenuList from "./MenuList";
import MuiToolTip from "../../../../atoms/MuiToolTip";

import { menuItems, settingsMenuListItems } from "./data";
import * as styles from "./styles";

const DrawerWrapper = ({ mobileOpen, handleDrawerToggle, testModeStatus }) => {
  const router = useRouter();
  const kycStatus = useSelector((state) => state.kycStatus.kycStatus);
  const user = useSelector((state) => state.user.user);

  let drawerStyle = "";

  switch (testModeStatus) {
    case true:
      drawerStyle = "testModeOnDrawer";
      break;
    case false:
      drawerStyle = "testModeOffDrawer";
      break;
    default:
      drawerStyle = "testModeOnDrawer";
  }

  const drawer = (
    <Box sx={testModeStatus ? styles.testModeOn : styles.testModeOff}>
      <img src="/LOGO.svg" alt="logo" style={styles.logo} />
      <Typography variant="title10" sx={styles.vendorIdText}>
        {`Vendor ID: ${user.vid}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography variant="title10" sx={styles.currencyText}>
          Currency
        </Typography>

        <SelectCurrencies />

        <MuiToolTip
          placement="right-start"
          title="Switch to view transaction of selected currency" // this will change based on account status
          style={styles.toolTipWithIcon}
        >
          <img src="/infoicon.svg" alt="info-logo" style={styles.infoIcon} />
        </MuiToolTip>
      </Box>
      <Divider sx={{ mt: 6, width: "80%" }} />

      <MuiToolTip
        placement="right-start"
        title="Click here to activate account"
        style={styles.toolTipWithoutIcon}
        withoutIcon
      >
        <Box
          sx={styles.activateAccountContainer}
          onClick={() => {
            if (mobileOpen) {
              handleDrawerToggle();
            }
            return router.push("/dashboard/kyc");
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          <Typography sx={styles.activateAccountText}>
            Activate Account
          </Typography>
          <Box sx={styles.progressBarContainer}>
            <LinearProgress
              sx={styles.linearProgress}
              variant="determinate"
              value={
                kycStatus !== undefined && kycStatus.percentage !== undefined
                  ? kycStatus.percentage
                  : undefined
              }
            />
            <Typography sx={styles.percentageText}>
              {kycStatus !== undefined && kycStatus.percentage !== undefined
                ? `${kycStatus.percentage}% Complete`
                : undefined}
            </Typography>
          </Box>
        </Box>
      </MuiToolTip>
      <Divider sx={{ mt: 2, width: "80%" }} />
      <Box sx={styles.menuItemContainer}>
        {menuItems.map((item) => {
          return (
            <Button
              onClick={() => {
                if (mobileOpen) {
                  handleDrawerToggle();
                }
                return router.push(`${item.url}`);
              }}
              sx={
                router.pathname === `${item.url}`
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              key={item.id}
            >
              {item.icon}
              <Typography sx={styles.itemMenuText} key={item.id}>
                {item.name}
              </Typography>
            </Button>
          );
        })}
        <MenuList itemList={settingsMenuListItems} />
      </Box>
    </Box>
  );

  return (
    <>
      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ ...styles[drawerStyle], display: { xs: "block", sm: "none" } }}
      >
        {drawer}
      </Drawer>

      {/* Drawer for laptop */}
      <Drawer
        variant="permanent"
        sx={{ ...styles[drawerStyle], display: { xs: "none", sm: "block" } }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};
export default DrawerWrapper;

DrawerWrapper.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  testModeStatus: PropTypes.bool.isRequired,
};
