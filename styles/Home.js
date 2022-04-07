import colors from "./colors";

export const styles = {
  AppBar: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: "60px",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
  },

  logoContainer: {
    with: "250px",
    color: "white",
    height: "100%",
    marginLeft: { lg: "15px", md: "15px", xs: "10px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  loginContainer: {
    with: "200px",
    marginRight: { lg: "35px", md: "35px", xs: "5px" },
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  formControler: {
    marginRight: "15px",
  },

  divider: {
    width: "2px",
    backgroundColor: "white",
    fontWeight: "bold",
    height: "40%",
  },

  yellowText: {
    fontfamily: "Noto Sans",
    paddingRight: "5px",
    fontSize: "11px",
    color: colors.orange,
    fontWeight: "700 bold",
    lineHeight: "17px",
    letterSpacing: "0.08em",
    textAlign: "left",
  },

  mainText: {
    fontSize: { lg: "24px", md: "24px", xs: "20px" },
    lineHeight: { lg: "37px", md: "37px", xs: "29px" },
    color: "#E5E5E5",
    fontFamily: "Noto Sans",
    letter: "13%",
    size: "23px",
    fontWeight: "700 medium",
    letterSpacing: "0.08em",
    textAlign: "center",
  },

  expandText: {
    fontSize: { lg: "25px", md: "24px", xs: "20px" },
    lineHeight: { lg: "37px", md: "37px", xs: "29px" },
    color: "orange",
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: "500 bold",
  },

  select: {
    color: "white",
    fontSize: "small",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  orangeText: {
    color: "orange",
    fontfamily: "Noto Sans",
    fontWeight: "500 medium",
    fontSize: "27px",
    letter: "6%",
    lineHeight: "37px",
  },

  mainContainer: {
    display: "flex",
    marginTop: "23%",
    height: "100%",
    alignItems: "center",
    justifycontent: "center",
    flexDirection: "column",
    position: "relative",
    // backgroundColor: "green",
    width: "100%",
    zIndex: 99,
  },

  innerContainer: {
    width: { lg: "50%", md: "50%", xs: "95%" },
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  buttonsContainer: {
    marginTop: "30px",
    // backgroundColor: "yellow",
    display: "flex",
    justifyContent: "space-around",
    width: { lg: "50%", md: "50%", xs: "100%" },
  },

  createAccountButton: {
    width: "167px",
    height: "49px",
    fontSize: "12px",
  },

  watchDemoButton: {
    width: "141px",
    height: "49px",
    fontSize: "12px",
  },
};
