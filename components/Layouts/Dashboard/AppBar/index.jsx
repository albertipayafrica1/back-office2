import PropTypes from "prop-types";
import Image from "next/image";
// import Cookies from "js-cookie";
// import axios from "axios";
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
import TestMode from "../Testmode";

const TopAppBar = ({ handleDrawerToggle, testModeStatus }) => {
  // const [loadingButton, setLoadingButton] = useState(false);
  const classes = useStyles();
  // const handleLogout = () => {
  //   setLoadingButton(true);
  //   const credentials = Cookies.get("iPayT");
  //   const config = {
  //     method: "post",
  //     url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${credentials} `,
  //     },
  //     withCredentials: true,
  //   };
  //   axios(config)
  //     .then((response) => {
  //       Cookies.set("iPayT", "", { expires: -1 });

  //       router.push(`/login/?country=${"KE"}`);
  //       setLoadingButton(false);
  //     })
  //     .catch((error) => {
  //       Cookies.set("iPayT", "", { expires: -1 });
  //       setLoadingButton(false);
  //       router.push(`/login/?country=${"KE"}`);
  //     });
  // };

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
                <Badge badgeContent={4} sx={styles.badge}>
                  <NotificationsActiveIcon sx={styles.notificationIcon} />
                </Badge>

                <Typography sx={styles.HelpText}>Hello, Diana</Typography>
                <Box sx={styles.userIconContainer}>
                  <Image src="/usericon.svg" width={16.15} height={16.15} />
                  <Image src="/down arrow.svg" width="8.88px" height="8.88px" />
                </Box>
              </Box>
            </Box>
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
