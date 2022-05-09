import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Stack,
  Toolbar,
  Menu,
} from "@mui/material";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LoadingButton from "@mui/lab/LoadingButton";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserDetails from "../UserDetails";
import * as styles from "../styles";
import { useStyles } from "../styles";

const TopAppBar = ({ handleDrawerToggle }) => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const router = useRouter();
  const matches = useMediaQuery("(min-width:600px)");
  const classes = useStyles();

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
        Cookies.set("iPayT", "", { expires: -1 });

        router.replace(`/login/?country=${"KE"}`); // update this once we get user location from the server
        setLoadingButton(false);
        // if (response.data.success === true) {
        //   // Cookies.set("iPayT", "", { expires: -1 });
        //   // router.push(`/login/?country=${"KE"}`); // update this once we get user location from the server
        //   // setLoadingButton(false);
        // }
      })
      .catch((error) => {
        Cookies.set("iPayT", "", { expires: -1 });
        setLoadingButton(false);
        router.push(`/login/?country=${"KE"}`); // still logout the user but have make another request to notify something wrong with logout endpoint
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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

              <UserDetails
                handleClick={handleClick}
                loadingButton={loadingButton}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleLogout={handleLogout}
                open={open}
              />
            </Box>
          </Box>
        ) : (
          <Stack>
            <Box className={classes.logoContainerOnMobile}>
              <Box className={classes.toggleIconContainer}>
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
                sx={{ mt: 3, mr: 12 }}
                className={classes.topNavigationIcon}
              >
                <UserDetails
                  handleClick={handleClick}
                  loadingButton={loadingButton}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleLogout={handleLogout}
                  open={open}
                  iconColor="white"
                />
              </Stack>
            </Box>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;

TopAppBar.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
};
