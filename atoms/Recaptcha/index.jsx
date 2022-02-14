import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import ReCAPTCHA from "react-google-recaptcha";

import * as styles from "./styles";

const Recaptcha = ({ captchaError, handleCaptchaToken, resetCaptcha }) => {
  const captchaRef = useRef();

  console.log(captchaError, "CAPTCHA eRROR in recaptcha");

  useEffect(() => {
    captchaRef.current.reset();
  }, [resetCaptcha]);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
        onChange={(token) => handleCaptchaToken(token)}
        onExpired={(e) => handleCaptchaToken("")}
        ref={captchaRef}
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
  resetCaptcha: PropTypes.bool.isRequired,
};

export default Recaptcha;
