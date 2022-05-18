import { useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import axios from "axios";
import Cookies from "js-cookie";

import Carousel from "../../components/Carousel";
import OTPInput from "../../components/OTPInput";
import Auth from "../../components/Layouts/Auth";
import ProtectedRoute from "../../components/ProtectedRoute";

import {
  fetchKycStatusRequest,
  fetchKycStatusSuccess,
  fetchKycStatusFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from "../../redux";

const Otp = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [clearTimer, setClearTimer] = useState(false);
  const [resendOtpSuccess, setResendOtpSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchKycStatusRequest());
    dispatch(fetchUserRequest());
    setClearTimer(true);
    setLoading(true);
    setError(null);
    setResendOtpSuccess(false);
    const joinedOtp = otp.join("");
    const credentials = Cookies.get("iPayT");
    console.log(credentials);
    const otpObject = {
      otp: joinedOtp,
      login_otp_token: credentials,
    };

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/otp-login`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      data: JSON.stringify(otpObject),
    };

    axios(config)
      .then((response) => {
        console.log(response, "otp response");
        if (
          response.data.success === true &&
          response.data.kycStatus !== undefined
        ) {
          Cookies.set("iPayT", response.data.token, {
            secure: true,
          });
          setLoading(false);
          setClearTimer(true);
          dispatch(fetchUserSuccess(response.data.registrationDetails));
          dispatch(fetchKycStatusSuccess(response.data.kycStatus));
          router.replace("/dashboard/kyc");
        } else {
          dispatch(fetchKycStatusFailure());
          setError("Invalid Otp");
          setClearTimer(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          setError(err.response.data.response);
          dispatch(fetchKycStatusFailure(err.response.data.response));
          dispatch(fetchUserFailure(err.response.data.response));
        } else {
          setError("Something went wrong");
          dispatch(fetchKycStatusFailure("Something went wrong"));
          dispatch(fetchUserFailure("Something went wrong"));
        }
        setClearTimer(true);
        setLoading(false);
        // router.replace("/login");
      });
  };
  const handleResendOtp = () => {
    setError(null);
    setResendOtpSuccess(false);

    const credentials = Cookies.get("iPayT");

    const config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/resend-otp`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response, "otp response");
        if (response.data.success === true) {
          setResendOtpSuccess(true);
        } else {
          setError("Couldnt Resend otp");
        }
      })
      .catch((err) => {
        console.log(err, "erro");

        if (err.response) {
          setError(err.response.data.response);
        } else {
          setError("Something went wrong");
        }
        setResendOtpSuccess(false);
        // router.replace("/login");
      });
  };
  return (
    <Auth
      left={<Carousel />}
      right={
        <OTPInput
          otp={otp}
          error={error}
          loading={loading}
          clearTimer={clearTimer}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleResendOtp={handleResendOtp}
          resendOtpSuccess={resendOtpSuccess}
        />
      }
    />
  );
};

export default Otp;

export const getServerSideProps = ProtectedRoute((context) => {
  const { req } = context;
  // console.log(req.headers.cookie, "cookie on header");
  const { country } = context.query;

  if (
    country === undefined ||
    (country.toUpperCase() !== "KE" &&
      country.toUpperCase() !== "UG" &&
      country.toUpperCase() !== "TZ" &&
      country.toUpperCase() !== "TG")
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
  return {
    props: {},
  };
});
