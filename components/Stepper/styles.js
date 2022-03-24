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
