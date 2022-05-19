const drawerWidth = "250px";

export const temporaryDrawer = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    boxShadow: "5px 0 5px -5px rgba(0, 0, 0, 0.25)",
    backgroundColor: (theme) => theme.colors.mono1,
    "& .MuiBox-root": {
      marginTop: "100px",
    },
    overflow: "hidden",
    "&:hover": {
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "30px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "white",
        borderRadius: "10px",
        outline: `1px solid slategrey`,
      },
    },
  },
};
export const permanentDrawer = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    boxShadow: "5px 0 5px -5px rgba(0, 0, 0, 0.25)",
    backgroundColor: (theme) => theme.colors.mono1,
    "& .MuiBox-root": {
      marginTop: "100px",
    },
    overflow: "hidden",
    "&:hover": {
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "30px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "white",
        borderRadius: "10px",
        outline: `1px solid slategrey`,
      },
    },
  },
};

export const logo = {
  width: "102px",
  height: "42.18px",
  marginTop: "40px",
};

export const menuItemContainer = {
  display: "flex",
  flexDirection: "column",
  paddingBottom: "20px",
  width: "80%",
  marginTop: "10px",
};

export const linearProgress = {
  width: "80px",
  height: "5px",
  color: "grey.500",
  backgroundColor: (theme) => theme.colors.mono1,
  mt: "10px",
  border: "1px solid #C4C4C4",
  boxSizing: "borderbox",
  borderRadius: "100px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: (theme) => theme.colors.orange,
  },
};

export const progressBarContainer = {
  display: "flex",
  flexDirection: "row",
  width: "75%",
  justifyContent: "space-between",
  alignContent: "center",
};

export const iconButton = {
  mr: 2,
  display: { sm: "none" },
};

export const vendorIdText = {
  color: "#000000",
  lineHeight: "16px",
  mt: "10px",
  fontStyle: "normal",
  letterSpacing: "0.02em",
};

export const currencyText = {
  color: (theme) => theme.colors.blue,
  lineHeight: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  letterSpacing: "0.02em",
  mt: 5,
};

export const itemMenuText = {
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "12px",
  ml: "10px",
  lineHeight: "16px",
  letterSpacing: "0.02em",
};

export const menuItem = {
  borderRadius: "5px",
  width: "165px",
  height: "44px",
  mt: 2,
  color: "#000000",
  "&:hover": {
    color: "white",
    backgroundColor: (theme) => theme.colors.blue,
  },
  "&.MuiButton-root": {
    display: "flex",
    justifyContent: "flex-start",
  },
};

export const activeMenuItem = {
  borderRadius: "5px",
  width: "165px",
  height: "44px",
  mt: 2,
  color: "white",
  backgroundColor: (theme) => theme.colors.blue,
  "&:hover": {
    backgroundColor: (theme) => theme.colors.blue,
  },
  "&.MuiButton-root": {
    display: "flex",
    justifyContent: "flex-start",
  },
};

export const toolTipWithoutIcon = {
  backgroundColor: "white",
  border: "0.1px solid #E74C3C",
  padding: "1.5px",
  paddingLeft: "5px",
  paddingRight: "10px",
  position: "relative",
  right: "70px",
  boxSizing: "borderbox",
  borderRadius: "0.5px",
  color: "black",
  fontStyle: "normal",
  fontWeight: "400",
  fontsize: "12px",
  lineHeight: "15px",
  letterSpacing: "0.09em",
};

export const toolTipWithIcon = {
  backgroundColor: "white",
  border: "0.1px solid #E74C3C",
  padding: "1.5px",
  paddingLeft: "5px",
  paddingRight: "10px",
  boxSizing: "borderbox",
  borderRadius: "0.5px",
  color: "black",
  fontStyle: "normal",
  fontWeight: "400",
  fontsize: "12px",
  lineHeight: "15px",
  letterSpacing: "0.09em",
};

export const activateAccountText = {
  fontSize: "12px",
};

export const testModeOn = {
  position: "relative",
  marginTop: "30px",
  marginLeft: "36px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

export const testModeOff = {
  position: "relative",
  marginTop: "0px",
  marginLeft: "36px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};
export const infoIcon = {
  width: "13px",
  height: "13px",
  position: "relative",
  left: "30px",
  top: "20px",
  cursor: "pointer",
};
