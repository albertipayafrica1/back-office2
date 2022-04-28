export const tabs = {
  "& .MuiTabs-indicator": {
    backgroundColor: (theme) => theme.colors.orange,
    height: 3,
  },
  "& .MuiTab-root": {
    color: (theme) => theme.colors.mono8,
    textTransform: "none",
  },
  "& .MuiTab-root.Mui-selected": {
    color: (theme) => theme.colors.mono5,
  },
};
