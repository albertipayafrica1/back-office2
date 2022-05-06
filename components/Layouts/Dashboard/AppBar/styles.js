import { makeStyles } from "@mui/styles";
import colors from "../../../../styles/colors";

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  appBarContainerTestModeOn: {
    width: "100%",
    padding: "0px",
    boxShadow: "none",
    marginTop: "45px",
    backgroundColor: colors.mono1,
    ml: { sm: `${drawerWidth}px` },
  },

  appBarContainerTestModeOff: {
    width: "100%",
    padding: "0px",
    boxShadow: "none",
    backgroundColor: colors.mono1,
    ml: { sm: `${drawerWidth}px` },
  },

  closeIcon: {
    color: colors.blue,
  },
}));

export const iconButton = {
  mr: 2,

  display: { sm: "none" },
};

export const searchContainer = {
  color: colors.mono5,
  marginLeft: "10px",
  width: "50%",
  display: "flex",
};

export const userDetailsContainer = {
  width: { xs: "50%", md: "300px", lg: "300px" },
  marginLeft: { xs: "0px", md: "200px", lg: "200px" },
  alighContent: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "row",
};

export const HelpText = {
  ml: "20px",
  mt: "5px",
  display: { xs: "none", md: "block", lg: "block" },
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "13px",
  lineHeight: "18px",
  letterSpacing: "0.01em",
  color: colors.mono5,
};

export const badge = {
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: "red",
    width: "15px",
    cursor: "pointer",
    height: "15px",
  },
};

export const notificationIcon = {
  ml: { xs: "50px", md: "20px", lg: "20px" },
  mt: "5px",
  width: "18.15px",
  cursor: "pointer",
  height: "18.15px",
  "&.MuiSvgIcon-root": {
    color: colors.blue,
  },
};

export const userIconContainer = {
  mt: "4px",
  ml: { xs: "25px", md: "5px", lg: "5px" },
  cursor: "pointer",
};

export const searchUserDetailsContainer = {
  ml: { sx: 0, md: 59, lg: 59 },
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

export const appBarContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

export const logo = {
  width: "50px",
  height: "50px",
};
