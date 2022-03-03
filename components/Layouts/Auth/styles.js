import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    position: "sticky",
    height: "1.75rem",
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.errorRed,
    zIndex: "100",
  },
  root: {
    width: "100%",
  },
  left: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  blueText: {
    color: theme.colors.blue,
  },
  whiteText: {
    color: theme.colors.mono1,
  },
}));

export default useStyles;
