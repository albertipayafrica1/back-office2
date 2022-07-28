export const checkbox = {
  color: "#c4c4c4",
  "&.MuiCheckbox-root": {
    "&.Mui-checked": {
      color: (theme) => theme.colors.orange,
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: 18,
    borderRadius: 10,
  },
};

export const helperText = {
  color: (theme) => theme.colors.errorRed,
};
