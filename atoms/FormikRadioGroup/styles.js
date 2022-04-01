export const radio = {
  color: "#C4C4C4",
  "&.MuiRadio-root": {
    "&.Mui-checked": {
      color: (theme) => theme.colors.orange,
      borderColor: (theme) => theme.colors.orange,
    },
  },
  "& .MuiSvgIcon-root ": {
    fontSize: 22,
    // backgroundColor: "white",
    borderRadius: 10,
  },
};

export const helperText = {
  color: (theme) => theme.colors.errorRed,
};
