import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: 0,
  },
  root: {
    backgroundColor: "white",
    borderRadius: 7,
    height: "10px",
    fontSize: 12,
    // [`& fieldset`]: {
    //   borderRadius: 7,
    //   height: "45px",
    //   borderColor: "#c4c4c4",
    // },
    // "& input::placeholder": {
    //   fontSize: "13px",
    // },
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

  inputOuterStyling: {
    // ".MuiAutocomplete-inputRoot": {
    //   height: "40px",
    //   borderRadius: "7px",
    // },
    "& label": {
      "&.Mui-focused": {
        color: theme.colors.blue,
      },
    },
    "& .MuiAutocomplete-inputRoot": {
      height: "40px",
      borderRadius: "7px",
      width: "100%",
      "& .MuiAutocomplete-input": {
        padding: "3px 4px 7.5px 6px",
      },
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: theme.colors.blue,
      },
    },
    "& .MuiOutlinedInput-root": {
      "& .Mui-focused": {
        borderColor: theme.colors.blue,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.colors.mono4,
      "& .Mui-focused": {
        color: theme.colors.blue,
      },
    },
  },
}));

export default useStyles;
