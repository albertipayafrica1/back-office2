export const styles = {
  container: {
    width: "100%",
    height: "39px",
    backgroundColor: (theme) => theme.colors.mono6,
    border: "1px solid",
    borderColor: (theme) => theme.colors.mono7,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "row",
  },

  LinksContainer: {
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
    marginLeft: "20px",
  },
  TextLink: {
    textDecoration: "none",
    color: (theme) => theme.colors.mono7,
  },

  TitleContainer: {
    marginLeft: "20px",
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
  },
};
