export const radio = (externalStyles) => {
  return {
    color: (theme) => {
      return externalStyles.borderColor || theme.colors.mono8;
    },
    "&.MuiRadio-root": {
      "&.Mui-checked": {
        color: (theme) => {
          return externalStyles.radioColor || theme.colors.orange;
        },
      },
    },
    "& .MuiSvgIcon-root ": {
      fontSize: 18,
      // backgroundColor: "white",
      borderRadius: 10,
    },
  };
};

export const helperText = {
  color: (theme) => theme.colors.errorRed,
};
