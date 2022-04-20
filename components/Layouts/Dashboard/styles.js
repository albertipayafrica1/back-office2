import { makeStyles } from "@mui/styles";

const drawerWidth = 250;
export const useStyles = makeStyles((theme) => ({
  AppBarContainer: {
    width: { sm: `ca lc(100%)` },
    padding: "0px",
    backgroundColor: "white",
    boxShadow: "none",
    // borderBottom: "1px solid #DBD7D7",
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#2029A4",
    },
    ml: { sm: `${drawerWidth}px` },
  },
  topNavigationIcon: {
    position: "fixed",
    right: "10px",
    width: "100px",
  },

  toggleIconContainer: {
    position: "fixed",
    left: "10px",
    display: "flex",
  },

  textField: {
    width: "80%",
  },
  input: {
    height: "40px",
    borderRadius: "8px",
    border: "0px solid #DBD7D7",
  },

  activateAccount: {
    width: "80%",
    marginLeft: "10%",
    height: "70px",
  },

  activateAccountTitle: {
    fontSize: "12px",
    cursor: "pointer",
    fontName: "regular",
    color: "white",
    marginTop: "10px",
    width: "80%",
  },

  activeActivateAccountitle: {
    fontSize: "12px",
    cursor: "pointer",
    fontName: "regular",
    color: "orange",
    marginTop: "10px",
    width: "80%",
  },

  textLink: {
    marginLeft: "10px",
    textDecoration: "none",
    color: "white",
    fontSize: "12px",
    fontName: "regular",
    fontStyle: "light",
    cursor: "pointer",
    "&:hover": {
      color: "orange",
    },
  },

  activeLink: {
    marginLeft: "10px",
    textDecoration: "none",
    color: "orange",
    fontSize: "12px",
    fontName: "regular",
    fontStyle: "light",
    cursor: "pointer",
  },

  menuText: {
    position: "relative",
    fontSize: "11px",
    color: "#969696",
    top: "5px",
  },

  productText: {
    fontSize: "11px",
    position: "relative",
    color: "#969696",
    padding: "10px",
    top: "5px",
  },

  menuContainer: {
    marginTop: "20px",
    paddingBottom: "100px",
  },

  activeMenuItem: {
    backgroundColor: "#E4F2FF",
    color: "black",
    width: "100%",
    "&:hover": {
      color: "black",
      backgroundColor: "#E4F2FF",
    },
  },

  menuItems: {
    cursor: "pointer",
    color: "white",
    backgroundColor: " #ffffff00",
    "&:hover": {
      color: "black",
      backgroundColor: "#E4F2FF",
    },
    width: "100%",
    "&:disabled": {
      backgroundColor: "#C4C4C4",
    },
  },

  menuItemsTransaction: {
    color: "white",
    borderRadius: "8px",
    display: "flex",
    marginTop: "10px",
    flexDirection: "row",
  },

  expandIcon: {
    color: "white",

    marginBottom: "2px",
    marginRight: "3px",
  },

  MenuIcon: {
    position: "relative",
    fill: "red",
  },

  ListItemText: {
    marginLeft: "10px",
    fontSize: "12px",
    textDecoration: "none",
    fontName: "regular",
    fontStyle: "light",
    cursor: "pointer",
    "&:hover": {
      color: "orange",
    },
  },

  navContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  topNavContent: {
    width: "100%",
    display: "flex",
    position: "relative",

    justifyContent: "space-around",
    top: "10px",
    flexDirection: "row",
  },

  userDetails: {
    display: "flex",
    position: "relative",
    bottom: "10px",
    left: "30px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    color: "black",
  },

  searchContent: {
    top: "10px",
    display: "flex",
    width: "70%",
  },

  loadingButton: {
    width: "100%",
    "&:hover": {
      border: "40px",
      backgroundColor: "#",
    },
  },

  logoContainer: {
    display: "flex",
    position: "fixed",
    alignItems: "center",
    justifyContent: "center",
    left: "0px",
    top: "0px",
    backgroundColor: "#2029A4",
    minWidth: drawerWidth,
  },

  searchBarContainer: {},

  userProfileContainer: {
    backgroundColor: "yellow",
    marginLeft: "30%",
    display: "flex",
    flexDirection: "column",
  },

  logoContainerOnMobile: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#2029A4",
    minWidth: "224px",
  },
  childContent: {
    width: "100%",
    p: 3,
    maxHeigth: "100vh",
  },
  logo: {
    marginRight: "20px",
  },
  closeIcon: {
    marginLeft: "2px",
    marginBottom: "5px",
  },
  CompanyText: {
    fontName: "regular",
    marginRight: "20px",
    marginBottom: "8px",
    fontSize: "12px",
  },
}));

export const temporaryDrawer = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    backgroundColor: "#2029A4",
  },
};

export const permanentDrawer = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
    backgroundColor: "#2029A4",
    marginTop: "55px",
    overflow: "hidden",
    "&:hover": {
      overflow: "scroll",
      "&::-webkit-scrollbar": {
        width: 6,
        height: 5,
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

export const iconButton = {
  mr: 2,
  display: { sm: "none" },
};

export const flagIcon = {
  width: "20px",
  height: "20px",
};
