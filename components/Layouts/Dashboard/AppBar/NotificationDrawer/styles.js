export const notificationContainer = {
  width: 250,
  display: "flex",
  paddingBottom: "10px",
  backgroundColor: (theme) => theme.colors.mono1,
  right: "0px",
  position: "fixed",
  maxHeight: "80vh",
  top: "110px",
  alignItems: "center",
  minHeight: "200px",
  flexDirection: "column",
  border: "1px solid #FFFFFF",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.25)",
};

export const bodyContainer = {
  maxHeight: "100%",
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
};

export const notification = {
  width: "90%",
  display: "flex",
  height: "40px",
  position: "sticky",
  backgroundColor: "white",
  top: 0,
  flexDirection: "row",
  alighnItems: "center",
  justifyContent: "space-around",
};

export const notificationContent = {
  display: "flex",
  fontWeight: "bold",
  flexDirection: "column",
  marginLeft: "20px",
  cursor: "pointer",
  paddingBottom: "10px",
};

export const arrowIcon = {
  color: "black",
  cursor: "pointer",
  marginLeft: "50px",
  marginTop: "11px",
};
export const notificationText = {
  marginTop: "15px",
  marginRight: "50px",
  color: (theme) => theme.colors.blue,
  fontStyle: "normal",
  fontSize: "11px",
  lineHeight: "15px",
  letterSpacing: "0.04em",
};

export const refundTitle = {
  marginTop: "16px",
  color: (theme) => theme.colors.blue,
  fontStyle: "normal",
  lineHeight: "15px",
  letterSpacing: "0.04em",
};

export const bodyText = {
  fontStyle: "normal",
  marginTop: "15px",
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "14px",
  letterSpacing: "0.04em",
  color: (theme) => theme.colors.mono5,
};

export const date = {
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 600,
  marginTop: "10px",
  fontSize: "10px",
  lineHeight: "14px",
  letterSpacing: "0.04em",
  color: "#8D8D8D",
};

export const discoverTitle = {
  fontStyle: "normal",
  marginTop: "15px",
  fontWeight: "700",
  fontSize: "11px",
  lineHeight: "14px",
  letterSpacing: "0.04em",
  color: (theme) => theme.colors.mono5,
};

export const notificationIcon = {
  width: "20px",
  marginTop: "20px",
  height: "20px",
};

export const notificationContentContainer = {
  width: "80%",
  display: "flex",
  flexDirection: "row",
  marginLeft: "10%",
};

export const emptyNotificationText = {
  color: (theme) => theme.colors.orange,
  marginTop: "45%",
  fontStyle: "normal",
  fontSize: "15px",
  lineHeight: "15px",
  letterSpacing: "0.04em",
};

export const viewAllContainer = {
  width: "100%",
  padding: "20px",
  display: "flex",
  direction: "row",
  justifyContent: "flex-end",
};

export const viewAllText = {
  color: (theme) => theme.colors.blue,
  cursor: "pointer",
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontSize: "11px",
};
