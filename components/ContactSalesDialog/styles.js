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
    fontSize: "19px",
    marginTop: "5px",
    marginBottom: "10px",
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

  inputsContainer: {
    width: { lg: "100%", md: "100%", xs: "95%" },
    height: "50px",
  },

  leftFormContainer: {
    width: { lg: "100%", md: "100%", xs: "95%" },
    height: "50px",
    marginTop: "30px",
  },

  rightFormContainer: {
    width: { lg: "210px", md: "210px", xs: "95%" },
    height: "50px",
    marginTop: "30px",
    marginLeft: { lg: "20px", md: "20px", xs: "Opx" },
  },

  LastnameForm: {
    width: { lg: "210px", md: "210px", xs: "95%" },
    height: "50px",
    marginTop: { lg: "0px", md: "0px", xs: "40px" },
    marginLeft: { lg: "20px", md: "20px", xs: "Opx" },
  },

  subject: {
    marginTop: "30px",
    width: { lg: "95%", md: "95%", xs: "95%" },
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
