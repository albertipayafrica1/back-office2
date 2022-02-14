import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.white,
        color: "rgba(7, 25, 40, 0.4)",
        padding: 0,
        fontSize: theme.f4,
    },
}));

export default useStyles;
