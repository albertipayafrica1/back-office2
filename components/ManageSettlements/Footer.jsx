import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack sx={{ pt: 10 }} spacing={2}>
      <Stack sx={{ pl: 5 }} spacing={1}>
        <Typography
          variant="subtitle8"
          sx={{ color: (theme) => theme.colors.lightRed }}
        >
          Terms and Conditions
        </Typography>
        <Typography variant="subtitle8">
          Public holidays and weekends are not counted as settlement days.
          However, any funds acquired during public holidays and/or weekends
          will be remitted on the next settlement date as per your settings
          above.
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <img src="/infoicon.svg" alt="infoicon" />
        <Typography variant="subtitle8">
          Note - To view settlement details for a different currency, switch
          with the currency dropdown on left sidebar. To edit your settlement
          Account Details, send an email request to{" "}
          <span style={{ color: "blue" }}>support@ipayafrica.com</span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
