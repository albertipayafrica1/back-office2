import colors from "../../../../styles/colors";

export const testModeText = {
  fontFamily: "Open Sans",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "15px",
  LetterSpacing: "5%",
  color: "rgba(38, 38, 38, 1)",
  letterSpacing: "0.05em",
  textAlign: "left",
  FontStyle: "Regular",
  LineHeight: "100%",
};

export const testModeContainer = {
  backgroundColor: colors.orange,
};

export const textModeOn = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(244, 146, 0, 1)",
  width: "100%",
  height: "48px",
  zIndex: 1300,
  cursor: "pointer",
};

export const testModeOff = {
  position: "fixed",
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(244, 146, 0, 1)",
  width: "100%",
  height: "48px",
  zIndex: 1300,
  cursor: "pointer",
};
