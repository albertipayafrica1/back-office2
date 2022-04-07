export const styles = {
  BookDemoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
    padding: "40px",
  },

  CallMeContainer: {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
  },

  title2: {
    color: "#124AA1",
    marginTop: "0px",
  },

  textPrivacy: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "10px",
    justifyContent: "center",
  },

  textTearms: {
    textDecoration: "none",
    color: "orange",
  },

  title3: {
    color: "orange",
    marginTop: "10px",
    marginLeft: "30px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "15px",
  },

  FormContainer: {
    marginTop: 5,
    flexDirection: { lg: "row", md: "row", xs: "column" },
    display: "flex",
  },

  leftInputs: {
    width: { lg: "50%", md: "50%", xs: "95%" },
  },

  rightInputs: {
    width: { lg: "50%", md: "50%", xs: "95%" },
    marginLeft: { lg: "30px", md: "30px", xs: "0px" },
    marginTop: { lg: "0px", md: "0px", xs: "10px" },
  },

  TelephoneText: {
    marginTop: { lg: "10px", md: "10px", xs: "20px" },
  },
  textTrusted: {
    marginTop: "20px",
    marginLeft: "8%",
    marginBottom: "20px",
    color: "orange",
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
