import { Styles } from "@mui/styles";

export const styles = (theme) => ({
  // root: {
  //   width: "90%",
  // },

  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

export const stepper = {
  backgroundColor: (theme) => theme.colors.mono1,
  color: "blue",
  zIndex: 2,
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "sticky",
  top: { xs: 100, md: 109 },
  "& .MuiStepIcon-root.Mui-active": {
    color: (theme) => theme.colors.blue,
  },
};

export const container = {
  padding: "0 2rem",
};
