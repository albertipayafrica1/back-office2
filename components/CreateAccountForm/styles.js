import colors from "../../styles/colors";

export const topContainer = { padding: "2.5rem 0 0 2.5rem" };

export const formContainer = { padding: "2rem" };

export const blueText = {
    color: colors.blue,
};

export const linkStyle = {
    textDecoration: "none",
};

export const divider = {
    background: "black",
};

export const submitButton = {
    width: "100%",
    mt: 5,
    color: colors.mono2,
    backgroundColor: colors.blue,
};

export const contactUs = {
    color: colors.orange,
};

export const privacyControlLabel = {
    paddingLeft: "1.3rem",
};
export const privacyControlErrorLabel = {
    paddingLeft: "2rem",
    color: (theme) => theme.colors.errorRed,
    fontSize: "0.75rem",
    fontWeight: 400,
};

export const recaptchaText = {
    paddingLeft: "2rem",
};
export const recaptchaErrorLabel = {
    color: (theme) => theme.colors.errorRed,
    fontSize: "0.75rem",
    fontWeight: 400,
};

export const checkbox = {
    "&.MuiCheckbox-root": {
        "&.Mui-checked": {
            color: (theme) => theme.colors.blue,
        },
    },
    "& .MuiSvgIcon-root": { fontSize: 22 },
};
