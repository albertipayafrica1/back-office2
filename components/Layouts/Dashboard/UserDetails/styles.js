import { makeStyles } from "@mui/styles";
import colors from "../../../../styles/colors";

export const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "24px",
    padding: "0px",
    position: "relative",
    left: "30px",
    top: "5px",
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: "orange",
      },
    },
  },
  thumb: {
    color: colors.orange,
    width: "20px",
    height: "20px",
    margin: "1px",
  },
  track: {
    borderRadius: "20px",
    border: "1.13636px solid #C4C4C4;",
    backgroundColor: colors.mono1,
    opacity: "1 !important",
    "&:after, &:before": {
      color: colors.mono5,
      fontSize: "10px",
      position: "absolute",
      top: "6px",
    },
    "&:after": {
      content: "'Live'",
      fontSize: "0.56rem",
      fontWeight: "bold",
      left: "5.8px",
    },
    "&:before": {
      content: "'Test'",
      fontSize: "0.56rem",
      fontWeight: "bold",
      right: "5.5px",
    },
  },
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(26px) !important",
  },
});

export const userDetailsContainerActive = {
  position: "absolute",
  width: "177px",
  height: "215px",
  top: "48px",
  color: "black",
  right: "10px",
  backgroundColor: colors.mono1,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
};

export const userDetailsContainerInactive = {
  position: "absolute",
  display: "none",
  width: "177px",
  height: "215px",
  top: "48px",
  color: "black",
  right: "10px",
  backgroundColor: colors.mono1,
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
};

export const modeSwitchContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const userProfileSetting = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "5px",
};

export const userProfileContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  cursor: "pointer",
  mt: "5px",
  "&:hover": {
    color: colors.blue,
  },
};

export const settingContainer = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  cursor: "pointer",
  mt: "5px",
  "&:hover": {
    color: colors.blue,
  },
};

export const logOutContainer = {
  display: "flex",
  flexDirection: "row",
  paddingBottom: "40px",
  justifyContent: "space-around",
};

export const companyText = {
  fontSize: "11px",
  ml: "12px",
  fontWeight: "400",
  fontStyle: "normal",
  mt: "15px",
  color: colors.blue,
};

export const modeText = {
  fontSize: "11px",
  top: "5px",
  left: "22px",
  position: "relative",
  color: colors.mono5,
};

export const loadingButton = {
  width: "100%",
  display: "flex",
  color: colors.mono5,
  justifyContent: "space-around",
  flexDirection: "row",
  "&:hover": {
    color: "white",
    border: "0px",
    backgroundColor: colors.blue,
  },
};

export const muiIcons = { fontSize: "20px", ml: "10px" };

export const Divider = {
  width: "100%",
  mt: "10px",
};
