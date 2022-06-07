import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  inputLabelNoShrink: {
    transform: "translate(14px, 12px) scale(1)",
    fontSize: "12px",
  },
}));

export const useOutlinedInputStyles = makeStyles((theme) => ({
  root: {
    "& $notchedOutline": {},
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
    backgroundColor: "white",
    borderRadius: 10,
  },
};

export const selectStyle = { height: "40px", borderRadius: "7px" };
