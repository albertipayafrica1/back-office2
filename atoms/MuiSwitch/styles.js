import { makeStyles } from "@mui/styles";
import colors from "../../styles/colors";

export const useStyles = makeStyles({
  root: {
    width: "50px",
    height: "24px",
    padding: "0px",
    margin: "0 6px",
    position: "relative",
  },
  switchBase: {
    color: "#818181",
    padding: "1px",
    "&$checked": {
      "& + $track": {
        backgroundColor: colors.orange,
      },
    },
  },
  thumb: (props) => ({
    color: ` ${props.checked ? colors.mono1 : colors.orange}`,
    width: "20px",
    height: "20px",
    margin: "1px",
  }),
  track: (props) => ({
    borderRadius: "20px",
    border: "1.13636px solid #C4C4C4;",
    backgroundColor: colors.mono1,
    opacity: "1 !important",
    "&:after, &:before": {
      color: colors.mono5,
      fontSize: "10px",
      position: "absolute",
      top: "6px",
    },
    "&:after": {
      content: `'${props.afterContent || ""}'`,
      fontSize: "0.5rem",
      fontWeight: "bold",
      left: "5.8px",
    },
    "&:before": {
      content: `'${props.beforeContent || ""}'`,
      fontSize: "0.5rem",
      fontWeight: "bold",
      right: "5.5px",
    },
  }),
  checked: {
    color: "#23bf58 !important",
    transform: "translateX(26px) !important",
  },
});
