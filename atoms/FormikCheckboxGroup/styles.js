export const checkbox = (externalStyles) => {
  return {
    color: (theme) => {
      return externalStyles.borderColor || theme.colors.mono8;
    },
    "&.MuiCheckbox-root": {
      "&.Mui-checked": {
        color: (theme) => {
          return externalStyles.checkboxColor || theme.colors.orange;
        },
      },
    },
    "& .MuiSvgIcon-root": {
      fontSize: 18,
      borderRadius: 10,
    },
  };
};

export const helperText = {
  color: (theme) => theme.colors.errorRed,
};
