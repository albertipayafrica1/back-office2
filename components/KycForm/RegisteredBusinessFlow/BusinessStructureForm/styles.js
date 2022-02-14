export const topContainer = { padding: "2.5rem 0 0 2.5rem" };

export const formContainer = { padding: "2rem" };

export const blueText = {
  color: (theme) => theme.colors.blue,
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
  color: (theme) => theme.colors.mono2,
  backgroundColor: (theme) => theme.colors.blue,
};

export const checkbox = {
  "&.MuiCheckbox-root": {
    "&.Mui-checked": {
      color: (theme) => theme.colors.blue,
    },
  },
  "& .MuiSvgIcon-root": { fontSize: 22 },
};
