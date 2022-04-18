import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";

import {
  AppBar,
  Box,
  Drawer,
  Typography,
  Collapse,
  ListItemText,
  List,
  LinearProgress,
  Toolbar,
  IconButton,
  Button,
  Stack,
  Popover,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as styles from "./styles";
import { useStyles } from "./styles";
import { Home, Transaction, MainMenu, Product, General } from "./data";

const Dashboard = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();
  const router = useRouter();

  const handleLogout = () => {
    setLoadingButton(true);
    const credentials = Cookies.get("iPayT");
    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials} `,
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          Cookies.set("iPayT", "", { expires: -1 });

          router.push(`/login/?country=${"KE"}`); // update this once we get user location from the server
          setLoadingButton(false);
        }
      })
      .catch((error) => {
        if (error.response === undefined) {
          setLoadingButton(false);
          Cookies.set("iPayT", "", { expires: -1 });
          router.push(`/login/?country=${"KE"}`); // still logout the user but have make another request to notify something wrong with logout endpoint
        }
      });
  };

  const drawerWidth = 240;
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ mt: "10px" }}>
        <Box className={classes.activateAccount}>
          <Link href="/dashboard/kyc">
            <Typography
              variant="caption2"
              className={
                router.pathname === "/dashboard/kyc"
                  ? `${classes.activeActivateAccountitle}`
                  : `${classes.activateAccountTitle}`
              }
            >
              Activate account
            </Typography>
          </Link>

          <LinearProgress variant="determinate" value={progress} />
          <Typography className={classes.activateAccountTitle}>
            50% complete
          </Typography>

          <Typography className={classes.menuText} variant="title9">
            MAIN MENU
          </Typography>

          <Box sx={{ mt: 5, pb: 30 }}>
            <Box>
              {Home.map((item) => (
                <Button
                  variant="contained"
                  disabled
                  className={
                    router.pathname === `${item.url}`
                      ? `${classes.activeMenuItem}`
                      : `${classes.menuItems}`
                  }
                >
                  <img src={item.icon} alt={item.name} />

                  <ListItemText disableTypography ListItemText>
                    <Link href={item.url}>
                      <Typography sx={{ mr: "40px" }} variant="caption2">
                        {item.name}
                      </Typography>
                    </Link>
                  </ListItemText>
                </Button>
              ))}
            </Box>

            <Box>
              <List>
                <Button
                  variant="contained"
                  disabled
                  sx={{ width: "100%" }}
                  onClick={handleClick}
                  className={
                    router.pathname === "/dashboard/transaction"
                      ? `${classes.activeMenuItem}`
                      : `${classes.menuItems}`
                  }
                >
                  <img
                    className={classes.icon}
                    src="/transaction 1.svg"
                    alt="home"
                  />
                  <Box
                    sx={{ width: "100%" }}
                    disable
                    variant="contained"
                    className={
                      router.pathname === "/dashboard/transaction"
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    Transactions
                  </Box>
                  {open ? (
                    <ExpandLessIcon className={classes.expandIcon} />
                  ) : (
                    <ExpandMoreIcon className={classes.expandIcon} />
                  )}
                </Button>

                <Collapse in={open} timeout="auto" unmountOnExit>
                  {Transaction.map((item) => (
                    <List sx={{ ml: "20px" }} component="div" disablePadding>
                      <Box
                        className={
                          router.pathname === `${item.url}`
                            ? `${classes.activeMenuItem}`
                            : `${classes.menuItems}`
                        }
                      >
                        <ListItemText>
                          <Link href={item.url}>
                            <Typography variant="caption2">
                              <Typography variant="caption2">
                                {item.name}
                              </Typography>
                            </Typography>
                          </Link>
                        </ListItemText>
                      </Box>
                    </List>
                  ))}
                </Collapse>
              </List>
              {MainMenu.map((item) => (
                <>
                  <Button
                    sx={{ width: "100%", mt: 3 }}
                    variant="contained"
                    disabled
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />

                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}

              <Typography className={classes.productText} variant="title9">
                PRODUCTS
              </Typography>

              {Product.map((item) => (
                <>
                  <Button
                    sx={{ width: "100%", mt: 3 }}
                    variant="contained"
                    disabled
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />
                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}

              <Typography className={classes.productText} variant="title9">
                GENERAL
              </Typography>
              {General.map((item) => (
                <>
                  <Button
                    sx={{ width: "100%", mt: 3 }}
                    variant="contained"
                    disabled
                    className={
                      router.pathname === `${item.url}`
                        ? `${classes.activeMenuItem}`
                        : `${classes.menuItems}`
                    }
                  >
                    <img
                      className={classes.MenuIcon}
                      src={item.icon}
                      alt={item.name}
                    />
                    <ListItemText>
                      <Link href={item.url}>
                        <Typography sx={{ mr: "30px" }} variant="caption2">
                          {item.name}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </Button>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AppBar className={classes.AppBarContainer} position="fixed">
        <Toolbar>
          {matches ? (
            <Box className={classes.navContainer}>
              <Box className={classes.logoContainer}>
                <Box className={classes.logo}>
                  <Image
                    src="/iPay_logoWnO 1.svg"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Box>
                <Typography className={classes.CompanyText}>
                  Company name
                </Typography>
              </Box>
              <Box className={classes.topNavContent}>
                <Box className={classes.searchContent} />

                <Box className={classes.userDetails}>
                  <Box sx={{ mt: 1, mr: 5 }}>
                    <HelpCenterIcon />
                  </Box>

                  <Box sx={{ mt: 1, mr: 5 }}>
                    <NotificationsActiveIcon />
                  </Box>

                  <Box>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <div>
                          <Typography {...bindTrigger(popupState)}>
                            <PersonOutlineIcon sx={{ cursor: "pointer" }} />
                          </Typography>
                          <Popover
                            sx={{ mt: 2 }}
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "center",
                            }}
                          >
                            <Box sx={{ p: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                              >
                                <LoadingButton
                                  onClick={handleLogout}
                                  loading={loadingButton}
                                  className={classes.loadingButton}
                                >
                                  <LogoutIcon sx={{ mr: 4 }} />
                                  Log out
                                </LoadingButton>
                              </Box>
                            </Box>
                          </Popover>
                        </div>
                      )}
                    </PopupState>
                  </Box>
                  <Box sx={{ ml: 5 }}>
                    <img style={styles.flagIcon} src="/KE.svg" alt="img" />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Stack>
              <Box className={classes.logoContainerOnMobile}>
                <Box sx={{ position: "fixed", left: "10px", display: "flex" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={styles.iconButton}
                  >
                    <MenuIcon className={classes.closeIcon} />
                  </IconButton>

                  <Box className={classes.logo}>
                    <Image
                      src="/iPay_logoWnO 1.svg"
                      alt="logo"
                      width={50}
                      height={50}
                    />
                  </Box>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  sx={{ position: "fixed", right: "10px", width: "100px" }}
                >
                  <HelpCenterIcon sx={{ color: "white" }} />
                  <NotificationsActiveIcon sx={{ color: "white" }} />
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <Box {...bindTrigger(popupState)}>
                          <PersonOutlineIcon
                            sx={{ cursor: "pointer", color: "white" }}
                          />
                        </Box>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <LoadingButton
                            onClick={handleLogout}
                            loading={loadingButton}
                            className={classes.loadingButton}
                          >
                            <LogoutIcon sx={{ mr: 4, color: "black" }} />
                            Log out
                          </LoadingButton>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                  <img style={styles.flagIcon} src="/KE.svg" alt="img" />
                </Stack>
              </Box>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
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

        <Drawer variant="permanent" sx={styles.permanentDrawer} open>
          {drawer}
        </Drawer>
      </Box>
      <Box className={classes.childContent}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func.isRequired,
};

export default Dashboard;
