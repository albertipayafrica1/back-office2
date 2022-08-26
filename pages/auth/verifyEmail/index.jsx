import { useEffect } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Alert, Stack } from "@mui/material";
import axios from "axios";

const VerifyEmail = ({ message, success, countryCode }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(`/auth/login?country=${countryCode}`);
    }, 2000);
  }, []);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Alert severity={success === true ? "success" : "error"}>
        <strong>{message}</strong>
      </Alert>
    </Stack>
  );
};

VerifyEmail.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  countryCode: PropTypes.string.isRequired,
};
export default VerifyEmail;

export const getServerSideProps = async (context) => {
  const { vc, country } = context.query;

  let message = "";
  let success = false;

  const body = {
    verificationCode: vc,
  };

  const config = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/email-verification`,
    headers: { "Content-Type": "application/json", "Device-Channel": "web" },
    data: body,
    withCredentials: true,
  };
  await axios(config)
    .then((response) => {
      if (response.data.success === true) {
        message = response.data.response;
        success = true;
      } else {
        message = "Something Went Wrong horribly wrong";
        success = false;
      }
    })
    .catch((error) => {
      if (error.response) {
        message = error.response.data.response;
        success = false;
      } else {
        message = "something went wrong";
        success = false;
      }
    });

  if (success === false && message === "") {
    message = "Something went wrong";
  }

  return {
    props: {
      message,
      success,
      countryCode: country.toUpperCase(),
    },
  };
};
