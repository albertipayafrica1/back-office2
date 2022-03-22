import colors from "./colors";

export const styles = {
  backgroundColor: {
    backgroundColor: "#1B309E",
    width: "100vw",
    overflow: "hidden",
  },

  backgroundImage: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    overflow: "hidden",
  },

  gatewayContainer: {
    marginTop: { lg: 25, md: 25, xs: 5 },
    marginLeft: { lg: 20, md: 20, xs: 5 },
    display: "flex",
    flexDirection: "column",
  },

  headerText: {
    marginLeft: { xs: 10, lg: 0, md: 0 },
    fontSize: { lg: 75, md: 75, xs: 50 },
  },

  SelectContryContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },

  book_demo: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },

  follow: {
    display: "flex",
    marginTop: "10px",
    padding: { lg: 0, md: 0, xs: 10 },
  },

  battonContainer: {
    display: "flex",
  },

  IconsContainer: {
    display: "flex",
    marginLeft: { lg: 20, md: 20, xs: 10 },
    marginTop: { lg: 10, md: 10, xs: 30 },
  },

  icon: {
    color: "white",
    marginLeft: "10px",
  },

  spacing: {
    marginLeft: { xs: 10, md: 90 }, //
  },

  font: {
    color: colors.mono1,
  },

  battonContainer2: {
    position: "relative",
    top: "20px",
    display: "flex",
    width: { lg: "60%", md: "60%", xs: "100%" },
    marginLeft: { lg: "170px", md: "170px", xs: "10px" }, //
    justifyContent: "space-around",
  },
};
