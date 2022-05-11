export const styles = {
  dialogueContainer: {
    position: "absolute",
    top: 100,
  },

  BookDemoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    padding: "40px",
  },

  salesText: {
    color: "#124AA1",
    letterSpacing: "0.08em",
    fontSize: "16px",
    marginTop: "5px",
    marginBottom: "10px",
  },
  salesDescription: {
    fontSize: "15px",
  },

  Textpolicy: {
    color: "orange",
    textDecoration: "none",
  },
  textDemo: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "15px",
    marginTop: "10px",
    marginBottom: "10px",
  },

  checkbtnContainer: {
    marginTop: "2px",
    display: "flex",
    flexDirection: "row",
  },
  FormContainer: {
    marginTop: "10px",
    flexDirection: { lg: "row", md: "row", xs: "column" },
    display: "flex",
  },

  subject: {
    marginTop: "10px",
    width: "100%",
  },

  textTrusted: {
    paddingBottom: "30px",
    marginLeft: { lg: "10%", md: "5%", xs: "5%" },
  },

  MarqueeContainer: {
    paddingBottom: "30px",
  },

  submitButton: {
    width: "100%",
    mt: 5,
    color: "white",
    backgroundColor: (theme) => theme.colors.blue,
  },
};
