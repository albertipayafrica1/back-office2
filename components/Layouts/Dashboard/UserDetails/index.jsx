import PropTypes from "prop-types";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { Box, Typography, Switch, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoadingButton from "@mui/lab/LoadingButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import * as styles from "./styles";
import { useStyles } from "./styles";

const UserDetails = ({ status }) => {
  const classes = useStyles();
  // const [checked, setChecked] = useState(true);
  const [checked, setChecked] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();

  // const toggleMode = (event) => {
  //   setChecked(event.target.checked);
  // };

  const toggleMode = (event) => {
    setChecked(false);
  };

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
        router.push(`/login/?country=${"KE"}`);
        setLoadingButton(false);
      })
      .catch((error) => {
        Cookies.set("iPayT", "", { expires: -1 });
        setLoadingButton(false);
        router.push(`/login/?country=${"KE"}`);
      });
  };

  return (
    <div
      style={
        status
          ? styles.userDetailsContainerActive
          : styles.userDetailsContainerInactive
      }
    >
      <Typography sx={styles.companyText}>
        FIVE SUPPORT KENYA LIMITED
      </Typography>

      <Divider sx={styles.Divider} />

      <Box sx={styles.modeSwitchContainer}>
        <Typography style={styles.modeText}>mode</Typography>

        <Switch
          size="medium"
          sx={styles.Switch}
          checked={checked}
          onChange={toggleMode}
          inputProps={{ "aria-label": "controlled" }}
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
        />
      </Box>
      <Divider sx={styles.Divider} />

      <Box sx={styles.userProfileSetting}>
        <Box
          // onClick={() => router.push("/dashboard/userProfile")}
          sx={styles.userProfileContainer}
        >
          <PersonOutlineIcon sx={styles.muiIcons} />
          <Typography sx={{ fontSize: "11px", mr: "60px" }}>
            User Profile
          </Typography>
        </Box>

        <Box
          // onClick={() => router.push("/dashboard/apiSettings")}
          sx={styles.settingContainer}
        >
          <SettingsIcon sx={styles.muiIcons} />
          <Typography
            sx={{
              fontSize: "11px",
              mr: "60px",
            }}
          >
            Api settings
          </Typography>
        </Box>
      </Box>
      <Divider sx={styles.Divider} />

      <Box sx={styles.logOutContainer}>
        <LoadingButton
          onClick={handleLogout}
          loading={loadingButton}
          sx={styles.loadingButton}
        >
          <LogoutIcon sx={{ fontSize: "20px", ml: "10px" }} />
          <Typography sx={{ fontSize: "11px", mr: "60px" }}>Log out</Typography>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default UserDetails;
UserDetails.propTypes = {
  status: PropTypes.bool.isRequired,
};
