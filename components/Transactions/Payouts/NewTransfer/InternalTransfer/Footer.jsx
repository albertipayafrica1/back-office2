import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack sx={{ pt: 10 }} direction="row" spacing={2}>
      <img src="/infoicon.svg" alt="infoicon" />
      <Typography variant="subtitle8">
        Note - To move funds from your Payin account into yout Payout account,
        navigate to.. Settlements {">"} Manage settlements {">"} Manual
        Settlement{">"} Internal Transfer
      </Typography>
    </Stack>
  );
};

export default Footer;
