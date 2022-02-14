import colors from "./colors";

export default {
  styleOverrides: {
    root: {
      boxShadow: "none",
      borderRadius: "8px",
      textTransform: "capitalize",
      fontSize: "14px",
    },
  },
  variants: [
    {
      props: {
        variant: "blue",
      },
      style: {
        color: colors.mono1,
        border: "1px solid",
        backgroundColor: colors.blue,
        padding: "0.875rem 1.75rem",
        borderRadius: "0.438rem",
        textTransform: "none",
        "&:hover": {
          backgroundColor: colors.blue,
          borderColor: colors.blue,
        },
      },
    },
    {
      props: {
        variant: "orange",
      },
      style: {
        color: colors.mono1,
        backgroundColor: colors.orange,
        padding: "0.875rem 1.75rem",
        borderRadius: "0.438rem",
        textTransform: "none",
        "&:hover": {
          backgroundColor: colors.orange,
        },
      },
    },
  ],
};
