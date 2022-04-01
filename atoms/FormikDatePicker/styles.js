import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 7,
    height: "60px",
    [`& fieldset`]: {
      borderRadius: 7,
      height: "65px",
      borderColor: "#c4c4c4",
    },
    "& input::placeholder": {
      fontSize: "20px",
    },
  },
}));

export default useStyles;
