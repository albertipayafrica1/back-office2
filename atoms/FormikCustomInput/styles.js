import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: 0,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 7,
    height: "40px",
    border: "0.1px",
    fontSize: 12,
  },
  multiline: {
    backgroundColor: "white",
    borderRadius: 7,
    height: "100px",
    border: "0.1px",
    fontSize: 12,
  },
  inputLabelNoShrink: {
    transform: "translate(14px, 8px) scale(1)",
  },
  inputLabelMultilineNoShrink: {
    transform: "translate(14px, 36px) scale(1)",
  },
}));

export default useStyles;
