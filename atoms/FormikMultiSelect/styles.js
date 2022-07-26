import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  inputLabelNoShrink: {
    transform: "translate(14px, 12px) scale(0.8)",
    // fontSize: "8px",
    fontWeight: 100,
    opacity: 0.9,
    fontFamily: "Roboto,sans-serif",
    color: "black",
  },
  inputLabelShrink: {
    // fontSize: "8px",
    fontWeight: 100,
    opacity: 0.9,
    fontFamily: "Roboto,sans-serif",
    color: "black",
  },
}));

export const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {
      fontSize: "20px",
    },
    "&:hover $notchedOutline": {
      borderColor: theme.colors.blue,
    },
    "&$focused $notchedOutline": {
      borderColor: theme.colors.blue,
    },
  },
  focused: {},
  notchedOutline: {},
}));

export const checkBoxStyle = {
  color: "#c4c4c4",
  "&.MuiCheckbox-root": {
    "&.Mui-checked": {
      color: (theme) => theme.colors.orange,
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: 22,
  },
};

export const selectStyle = {
  height: "40px",
  borderRadius: "7px",
  fontSize: "12px",
};
