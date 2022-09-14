import { useState } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import PropTypes from "prop-types";

import Cookies from "js-cookie";
import axios from "axios";

import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";

import LoadingButton from "@mui/lab/LoadingButton";

import MuiSwitch from "../../../../../atoms/MuiSwitch";

import * as styles from "./styles";

const UserDetails = ({ status }) => {
  const [checked, setChecked] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  const toggleMode = () => {
    // setChecked((prevState) => !prevState);
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
        "Device-Channel": "web",
      },
      withCredentials: true,
    };
    axios(config)
      .then((response) => {
        Cookies.set("iPayT", "", { expires: -1 });
        router.push(`/auth/login/?country=${"KE"}`);
        setLoadingButton(false);
      })
      .catch((error) => {
        Cookies.set("iPayT", "", { expires: -1 });
        setLoadingButton(false);
        router.push(`/auth/login/?country=${"KE"}`);
      });
  };

  return (
    <Box
      style={
        status
          ? styles.userDetailsContainerActive
          : styles.userDetailsContainerInactive
      }
    >
      <Box
        sx={{
          display: "flex",
          justifycontent: "center",
          alignItem: "center",
          // maxHeight: "25px",
          padding: "15px",
          width: "177px",
          borderBottom: "1px solid #c4c4c4",
        }}
      >
        <Box sx={styles.companyText}>
          {user.businessName !== null &&
          user.businessName !== undefined &&
          user.businessName !== ""
            ? user.businessName
            : `${user.firstName} ${user.surname}`}
        </Box>
      </Box>

      <Box sx={styles.modeSwitchContainer}>
        <Typography style={styles.modeText}>Mode</Typography>
        <MuiSwitch
          checked={checked}
          toggleSwitch={toggleMode}
          externalStyles={{
            beforeContent: "Test",
            afterContent: "Live",
          }}
        />
      </Box>

      <Box sx={styles.userProfileSetting}>
        <Box
          // onClick={() => router.push("/dashboard/userProfile")}
          sx={styles.userProfileContainer}
        >
          <PersonOutlineIcon sx={styles.muiIcons} />
          <Typography sx={{ fontSize: "11px", padding: "0 6px" }}>
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
              padding: "0 6px",
            }}
          >
            Api settings
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.logOutContainer}>
        <LoadingButton
          onClick={handleLogout}
          loading={loadingButton}
          sx={styles.loadingButton}
        >
          <Box sx={styles.logOutDisplay}>
            <LogoutIcon sx={{ fontSize: "20px" }} />
            <Typography sx={{ fontSize: "11px", padding: "0 6px" }}>
              Log out
            </Typography>
          </Box>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default UserDetails;
UserDetails.propTypes = {
  status: PropTypes.bool.isRequired,
};
