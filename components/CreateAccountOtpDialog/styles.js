export const formContainer = {
  margin: "40px",
  flexDirection: { lg: "row", md: "row", xs: "column" },
  display: "flex",
};

export const submitButton = {
  width: "100%",
  mt: 5,
  color: (theme) => theme.colors.mono2,
  backgroundColor: (theme) => theme.colors.blue,
};

export const otpText = {
  background: (theme) => theme.colors.orange,
  color: (theme) => theme.colors.mono2,
  padding: "2px 6px",
  borderRadius: "7px",
};

export const otpField = {
  maxWidth: "3rem",
  height: "3.5rem",
  fontSize: "2rem",
  borderRadius: "0.5rem",
  borderColor: "gray",
};

export const blueText = {
  color: (theme) => theme.colors.blue,
};
