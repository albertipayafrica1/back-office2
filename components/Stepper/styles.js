import { withStyles } from "@mui/styles";

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
  stepIconRoot: {
    color: "pink",
    "&.Mui-active": {
      color: "red",
    },
    "&.Mui-completed": {
      color: "green",
    },
  },
});

export const stepper = {
  backgroundColor: (theme) => theme.colors.mono1,
  color: "blue",
  zIndex: 1,
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  position: "sticky",
  top: 63,
};
