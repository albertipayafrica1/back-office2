import { createTheme } from "@mui/material/styles";
import colors from "./colors";

import MuiTypography from "./MuiTypography";
import MuiButton from "./MuiButton";

const lightTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","), // to be discussed
  },
  colors,
  components: {
    MuiTypography,
    MuiButton,
  },
  spacing: 4,
  f1: "24px",
  f2: "20px",
  f3: "16px",
  f4: "12px",
  bold5: 500,
});

export default lightTheme;
