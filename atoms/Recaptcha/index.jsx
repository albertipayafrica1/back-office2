import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import ReCAPTCHA from "react-google-recaptcha";

import * as styles from "./styles";

const Recaptcha = ({ captchaError, handleCaptchaToken }) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={(token) => handleCaptchaToken(token)}
        onExpired={(e) => handleCaptchaToken("")}
      />

      {captchaError !== "" && (
        <Typography variant="subtitle3" sx={styles.recaptchaErrorLabel}>
          {captchaError}
        </Typography>
      )}
    </Stack>
  );
};

Recaptcha.propTypes = {
  captchaError: PropTypes.string.isRequired,
  handleCaptchaToken: PropTypes.func.isRequired,
};

export default Recaptcha;
