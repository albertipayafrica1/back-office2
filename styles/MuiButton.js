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
        color: colors.mono5,
        backgroundColor: colors.orange,
        padding: "0.875rem 1.75rem",
        borderRadius: "0.438rem",
        textTransform: "none",
        "&:hover": {
          backgroundColor: colors.orange,
        },
      },
    },

    {
      props: {
        variant: "yellowOrange",
      },
      style: {
        color: colors.TypanBlue,
        backgroundColor: colors.yellowOrange,

        borderRadius: "4px",
        textTransform: "none",
        "&:hover": {
          backgroundColor: colors.yellowOrange,
        },
      },
    },

    {
      props: {
        variant: "yellowBorder",
      },
      style: {
        color: colors.yellowOrange,

        border: `2px  solid ${colors.yellowOrange}`,
        borderRadius: "4px",
        textTransform: "none",
        "&:hover": {
          border: `2px  solid ${colors.yellowOrange}`,
        },
      },
    },
    // used in the old landing page
    // {
    //   props: {
    //     variant: "white",
    //   },

    //   style: {
    //     backgroundColor: "white",
    //     color: "orange",
    //     padding: "10px",
    //     width: "70%",
    //     fontSize: "medium",
    //     borderRadius: "8px",
    //     "&:hover": {
    //       backgroundColor: "orange",
    //       color: colors.mono1,
    //     },
    //   },
    // },
  ],
};
