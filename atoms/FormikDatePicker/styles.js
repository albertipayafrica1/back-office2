import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 7,
    height: "38px",
    fontSize: 12,
    [`& fieldset`]: {
      borderRadius: 7,
      height: "45px",
      borderColor: "#c4c4c4",
    },
    "& input::placeholder": {
      fontSize: "13px",
    },
  },
  inputLabelNoShrink: {
    transform: "translate(20px, 20px) scale(1)",
  },
  error: {
    color: theme.colors.errorRed,
  },
}));

export default useStyles;
