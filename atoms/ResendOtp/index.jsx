import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { Stack, Typography, Button } from "@mui/material";

import * as styles from "./styles";

const ResendOtp = ({ seconds, clearTimer }) => {
  const [counter, setCounter] = useState();

  const handleResendOtp = () => {
    if (counter > 0) return;
    sessionStorage.removeItem("timer");
    console.log(counter);
    setCounter(seconds);
  };

  useEffect(() => {
    const timer = sessionStorage.getItem("timer");
    if (timer !== null && clearTimer) {
      sessionStorage.removeItem("timer");
    }
  }, [clearTimer]);

  useEffect(() => {
    const timer = sessionStorage.getItem("timer");
    // if (timer !== null && clearTimer) {
    //   sessionStorage.removeItem("timer");
    // }
    if (timer === null) {
      sessionStorage.setItem("timer", seconds);
      setCounter(seconds - 1);
    } else {
      setCounter(sessionStorage.getItem("timer"));
      const timer1 =
        counter > 0 &&
        setInterval(() => {
          sessionStorage.getItem(timer);
          setCounter(timer - 1);
          sessionStorage.setItem("timer", timer - 1);
        }, 1000);
      return () => clearInterval(timer1);
    }
    return null;
  }, [counter]);

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="body2"> Didnt Receive OTP ? </Typography>{" "}
      <Button
        sx={styles.resendOtpButton}
        onClick={handleResendOtp}
        disabled={counter > 0}
      >
        Resend OTP{" "}
      </Button>
      {counter > 0 && (
        <Typography variant="subtitle3" sx={styles.timer}>
          {counter} {" secs "}
        </Typography>
      )}
    </Stack>
  );
};

ResendOtp.propTypes = {
  seconds: PropTypes.number.isRequired,
  clearTimer: PropTypes.bool.isRequired,
};

export default ResendOtp;
