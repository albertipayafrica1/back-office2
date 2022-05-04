export const button = {
  borderRadius: "5px",
  color: (theme) => theme.colors.mono5,
  borderColor: (theme) => theme.colors.orange,
  "&:hover": {
    borderColor: (theme) => theme.colors.orange,
    backgroundColor: (theme) => theme.colors.orange,
    boxShadow: "none",
  },
  "&:active": {
    borderColor: (theme) => theme.colors.orange,
    backgroundColor: (theme) => theme.colors.orange,
  },
};
