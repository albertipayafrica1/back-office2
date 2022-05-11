import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Drawer, Typography, Button, LinearProgress } from "@mui/material";
import Divider from "@mui/material/Divider";
import SelectCurrencies from "../SelectCurrencies";
import MuiToolTip from "../../../../atoms/MuiToolTip";
import { MenuItems } from "../data";
import * as styles from "./styles";

const DrawerWrapper = ({ mobileOpen, handleDrawerToggle, testModeStatus }) => {
  const router = useRouter();
  const drawer = (
    <div>
      <div style={testModeStatus ? styles.testModeOn : styles.testModeOff}>
        <img src="/LOGO.svg" alt="logo" style={styles.logo} />
        <Typography variant="title10" sx={styles.vendorIdText}>
          Vendor ID: fivespot
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
            title="Switch to view transaction of selected currencies" // this will change based on account status
            style={styles.toolTip}
          />
        </div>
        <Divider sx={{ mt: 6, width: "80%" }} />
        {/* eslint-disable */}
        <div
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/dashboard/kyc")}
        >
          {/* eslint-disable */}
          <Typography
            onClick={() => router.push("/dashboard/kyc")}
            sx={styles.activateAccountText}
          >
            Activate Account
          </Typography>
          <div style={{ position: "absolute", top: "150px", left: "108px" }}>
            <MuiToolTip
              placement="right-start"
              title="Click her to activate account"
              style={styles.toolTip}
            />
          </div>
          <div style={styles.progressBarContainer}>
            <LinearProgress sx={styles.linearProgress} />
            <Typography sx={{ fontSize: "11px" }}>25% Complete</Typography>
          </div>
        </div>
        <Divider sx={{ mt: 2, width: "80%" }} />
        <div style={styles.menuItemContainer}>
          {MenuItems.map((item) => {
            return (
              <Button
                onClick={() => router.push(`${item.url}`)}
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
      {/**Drawer for mobile */}
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

      {/**Drawer for laptop */}
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
