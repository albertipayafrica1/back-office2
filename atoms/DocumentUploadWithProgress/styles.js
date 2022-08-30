import { linearProgressClasses } from "@mui/material/LinearProgress";

export const styles = {
  progressBar: {
    height: "0.75rem",
    borderRadius: "0.375rem",
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: "0.375rem",
      backgroundColor: "orange",
    },

    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: (theme) => theme.colors.blue,
    },
  },
  dropzone: {
    borderStyle: "dotted",
    height: "80px",
    borderRadius: "7px",
    padding: "5px",
    borderColor: "#C3BDBD",
    background: "white",
  },
  dropzoneInnerTitle: {
    color: (theme) => theme.colors.mono6,
  },
  dropzoneOuterTitle: {
    color: (theme) => theme.colors.mono6,
    paddingLeft: "15px",
  },
};
