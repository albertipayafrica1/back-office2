import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import {
  Drawer,
  Typography,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";

import SelectCurrencies from "../SelectCurrencies";

import MuiToolTip from "../../../../atoms/MuiToolTip";

import { MenuItems } from "../data";
import * as styles from "./styles";

const DrawerWrapper = ({ mobileOpen, handleDrawerToggle, testModeStatus }) => {
  const router = useRouter();
  const kycStatus = useSelector((state) => state.kycStatus.kycStatus);
  const user = useSelector((state) => state.user.user);

  const drawer = (
    <div>
      <div style={testModeStatus ? styles.testModeOn : styles.testModeOff}>
        <img src="/LOGO.svg" alt="logo" style={styles.logo} />
        <Typography variant="title10" sx={styles.vendorIdText}>
          {`Vendor ID: ${user.vid}`}
        </Typography>
        <div
          style={{
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
        </div>
        <Divider sx={{ mt: 6, width: "80%" }} />

        <MuiToolTip
          placement="right-start"
          title="Click here to activate account"
          style={styles.toolTipWithoutIcon}
          withoutIcon
        >
          <div
            style={{ cursor: "pointer", marginTop: "5px" }}
            onClick={() => {
              router.push("/dashboard/kyc");
              return handleDrawerToggle();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={() => {}}
          >
            <Typography sx={styles.activateAccountText}>
              Activate Account
            </Typography>
            <div style={styles.progressBarContainer}>
              <LinearProgress
                sx={styles.linearProgress}
                variant="determinate"
                value={
                  kycStatus !== undefined && kycStatus.percentage !== undefined
                    ? kycStatus.percentage
                    : undefined
                }
              />
              <Typography sx={{ fontSize: "11px" }}>
                {kycStatus !== undefined && kycStatus.percentage !== undefined
                  ? `${kycStatus.percentage}% Complete`
                  : undefined}
              </Typography>
            </div>
          </div>
        </MuiToolTip>
        <Divider sx={{ mt: 2, width: "80%" }} />
        <div style={styles.menuItemContainer}>
          {MenuItems.map((item) => {
            return (
              <Button
                onClick={() => {
                  router.push(`${item.url}`);
                  return handleDrawerToggle();
                }}
                sx={
                  router.pathname === `${item.url}`
                    ? styles.activeMenuItem
                    : styles.menuItem
                }
              >
                {item.icon}
                <Typography sx={styles.itemMenuText}> {item.name}</Typography>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
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
        sx={styles.temporaryDrawer}
      >
        {drawer}
      </Drawer>

      {/* Drawer for laptop */}
      <Drawer variant="permanent" sx={styles.permanentDrawer} open>
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
