export const button = {
  borderRadius: "5px",
  width: "100%",
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

export const activeButton = {
  borderRadius: "5px",
  width: "100%",
  color: (theme) => theme.colors.mono5,
  borderColor: (theme) => theme.colors.orange,
  backgroundColor: (theme) => theme.colors.orange,
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
