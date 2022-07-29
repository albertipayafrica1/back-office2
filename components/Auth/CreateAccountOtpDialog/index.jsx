import PropTypes from "prop-types";
import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import axios from "axios";

import Dialog from "../../../atoms/Dialog/index";
import ResendOtp from "../../../atoms/ResendOtp";
import MuiAlert from "../../../atoms/MuiAlert";

import * as styles from "./styles";

const CreateAccountOtpDialog = ({
  open,
  toggleOtpDialog,
  backDropVisible,
  paperPropsStyling,
}) => {
  const [alert, setAlert] = useState(false);

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clearTimer, setClearTimer] = useState(false);
  const [resendOtpSuccess, setResendOtpSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClearTimer(true);
    setLoading(true);
    setError(null);
    setResendOtpSuccess(false);
    const joinedOtp = otp.join("");

    const otpObject = {
      otp: joinedOtp,
    };

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/otp-login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(otpObject),
    };

    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false);
          setClearTimer(true);
        } else {
          setError("Invalid Otp");
          setClearTimer(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.response);
        } else {
          setError("Something went wrong");
        }
        setError("Something went wrong");
        setClearTimer(true);
        setLoading(false);
        // router.replace("/login");
      });
  };

  const handleChange = (element, index) => {
    if (Number.isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value === "" && element.previousSibling) {
      return element.previousSibling.focus();
    }
    if (element.value === "" && !element.previousSibling) {
      return null;
    }
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
    return null;
  };

  const handleResendOtp = () => {
    setError(null);
    setResendOtpSuccess(false);

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/resend-otp`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.success === true) {
          setResendOtpSuccess(true);
        } else {
          setError("Couldnt Resend otp");
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.response);
        } else {
          setError("Something went wrong");
        }
        setResendOtpSuccess(false);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleOtpDialog}
        backDropVisible={backDropVisible}
        paperPropsStyling={paperPropsStyling}
      >
        <Box sx={styles.formContainer}>
          <Stack direction="column" spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="title6" sx={styles.otpText}>
                One Time Password (OTP) is sent to your mobile
              </Typography>
            </Stack>

            <Typography variant="title6">Enter OTP</Typography>
            <Typography variant="body2">
              An OTP has been sent to your mobile please verify it below
            </Typography>
            <Stack direction="row" spacing={3}>
              {otp.map((data, index) => (
                <input
                  style={styles.otpField}
                  onPaste="return false;"
                  className="otp-field"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </Stack>
            <ResendOtp
              seconds={130}
              clearTimer={clearTimer}
              handleResendOtp={handleResendOtp}
            />
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              size="large"
              sx={styles.submitButton}
              onClick={handleSubmit}
              disabled={otp.join("").length !== 5}
            >
              Verify
            </LoadingButton>

            {error && <MuiAlert variant="error" message={error} />}
            {resendOtpSuccess && (
              <MuiAlert variant="success" message="Otp has been resent!" />
            )}
          </Stack>
        </Box>
      </Dialog>
    </div>
  );
};

CreateAccountOtpDialog.defaultProps = {
  paperPropsStyling: {},
  backDropVisible: false,
};

CreateAccountOtpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOtpDialog: PropTypes.func.isRequired,
  backDropVisible: PropTypes.bool,
  paperPropsStyling: PropTypes.shape({}),
};

export default CreateAccountOtpDialog;
