import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import axios from "axios";

import useForm from "../../hooks/useForm";
import { createAccount } from "../../utils/formValidations/createAccount";
import { countryOfOperation } from "../../utils/countryOfOperation";

import Carousel from "../../components/Carousel";
import CreateAccountForm from "../../components/CreateAccountForm";
import Auth from "../../components/Layouts/Auth";

const CreateAccount = ({ countryCode, rc }) => {
  const router = useRouter();

  const [
    formData,
    handleFormChange,
    handleCheckboxGroupChange,
    handleCheckboxChange,
  ] = useForm({
    surname: "",
    firstName: "",
    middleName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOperation: countryCode,
    registrationDetails: "",
    revenue: "",
    businessType: "",
    ipayProducts: [],
    aboutUs: "2",
    referral: rc,
    ads: "1",
    privacy: false,
  });

  const [errors, setErrors] = useState({
    surname: "",
    firstName: "",
    middleName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOperation: "",
    registrationDetails: "",
    revenue: "",
    businessType: "",
    ipayProducts: "",
    aboutUs: "",
    referral: "",
    ads: "",
    privacy: "",
    captcha: "",
    generic: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [verifiedCaptchaToken, setVerifiedCaptchaToken] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    // this useEffect is used so that whenever other country is selected after selected ipayproducts, then ipay products get unchecked
    if (formData.ipayProducts.includes("2")) {
      formData.ipayProducts = ["2"];
    } else {
      formData.ipayProducts = [];
    }
  }, [formData.countryOfOperation]);

  const handleCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    setDisableButton(true);
    setEmailAlert(false);
    e.preventDefault();
    setErrors({
      ...errors,
      generic: "",
    });
    setLoading(true);
    if (formData.aboutUs === "social Media" || formData.aboutUs === "website") {
      formData.referral = "None";
      formData.ads = "None";
    }

    const isValid = await createAccount.isValid(formData, {
      abortEarly: false,
    });

    if (isValid && captchaToken !== "") {
      // await axios
      //   .post(`https://merchantregistration.ipayprojects.com/auth/recaptcha`, {
      //     token: captchaToken,
      //   })
      //   .then((response) => {
      //     if (response.data.success === true) {
      //       setVerifiedCaptchaToken(true);
      //     } else {
      //       setVerifiedCaptchaToken(false);
      //     }
      //     console.log(response, "captchaendpointreponse");
      //   })
      //   .catch((err) => {
      //     console.log("in catch forrecaptcha");
      //     setCaptchaToken("");
      //     setResetCaptcha(true);
      //     setDisableButton(false);

      //     setVerifiedCaptchaToken(false);
      //     setErrors({
      //       ...errors,
      //       captcha: "You are not a human",
      //     });
      //     setErrors({ ...errors, generic: "kindly resolve the errors" });
      //   })
      //   .finally(() => {
      //     // reCaptcha.current.reset();
      //     setDisableButton(false);
      //   });

      // return;
      //   if (errors.captcha !== "" && verifiedCaptchaToken === false) {
      //     console.log("enterd if");
      //     return;
      //   }

      setErrors({});
      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(formData),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          console.log(response, "response");
          if (response.data.success === true) {
            setEmailAlert(true);
            setTimeout(() => {
              router.replace(
                `/login?country=${countryCode}&status=newAccountCreated`
              );
            }, 3000);
          } else {
            console.log(response, "response0");
            setErrors({ ...errors, generic: "Invalid username or Password" });
            setLoading(false);
            setDisableButton(false);
            setCaptchaToken("");
            setResetCaptcha(true);
          }
        })
        .catch((error) => {
          console.log(error.response, "response");

          if (error.response.status === 406) {
            setErrors({ ...error.response.data.response });
          } else if (error.response) {
            setErrors({ ...errors, generic: error.response.data.response });
          } else {
            setErrors({ generic: "Something went wrong" });
          }
          setDisableButton(false);
          setLoading(false);
          setCaptchaToken("");
          setResetCaptcha(true);
        });

      setLoading(false);
    } else if (isValid && captchaToken === "") {
      setErrors({
        ...errors,
        captcha: "kindly verify the captcha",
      });
      setLoading(false);
      setDisableButton(false);
      setResetCaptcha(true);
    } else {
      await createAccount
        .validate(formData, { abortEarly: false })
        .catch((err) => {
          let errs = err.inner.reduce((acc, error) => {
            return {
              ...acc,
              [error.path]: error.message,
              generic: "Kindly resolve form errors",
            };
          }, {});
          if (captchaToken === "") {
            errs = {
              ...errs,
              captcha: "kindly Verify the captcha",
              generic: "Kindly resolve form errors",
            };
          }
          setErrors(errs);
          setLoading(false);
          setDisableButton(false);
          setResetCaptcha(true);
          console.log(errs, "errors");
        });
    }
  };

  return (
    <Auth
      left={<Carousel />}
      right={
        <CreateAccountForm
          formData={formData}
          handleFormChange={handleFormChange}
          handleCheckboxGroupChange={handleCheckboxGroupChange}
          handleCheckboxChange={handleCheckboxChange}
          errors={errors}
          handleSubmit={handleSubmit}
          handleCaptchaToken={handleCaptchaToken}
          loading={loading}
          disableButton={disableButton}
          resetCaptcha={resetCaptcha}
        />
      }
      alert={emailAlert}
      nameOnAlert={formData.firstName}
    />
  );
};

export const getServerSideProps = async (context) => {
  const { country, rc } = context.query;

  let givenCountryCode = country;
  const givenrc = rc;

  if (givenCountryCode === undefined && givenrc === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=ke&rc=RC007`,
      },
    };
  }
  if (
    givenCountryCode !== "ke" &&
    givenCountryCode !== "ug" &&
    givenCountryCode !== "tz" &&
    givenCountryCode !== "tg" &&
    givenrc !== undefined
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=ke&rc=${givenrc}`,
      },
    };
  }
  if (
    givenCountryCode !== undefined &&
    givenCountryCode !== "ke" &&
    givenCountryCode !== "ug" &&
    givenCountryCode !== "tz" &&
    givenCountryCode !== "tg" &&
    givenrc === undefined
  ) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=ke&rc=RC0000`,
      },
    };
  }
  if (givenCountryCode !== undefined && givenrc === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=${givenCountryCode}&rc=RC0000`,
      },
    };
  }

  if (givenCountryCode === undefined) {
    givenCountryCode = "ke";
  }
  const givenCountry = countryOfOperation(givenCountryCode);

  const data = {
    country: givenCountry,
    rc: givenrc,
  };

  return {
    props: {
      countryCode: givenCountryCode,
      rc: givenrc,
    },
  };
};

CreateAccount.propTypes = {
  countryCode: PropTypes.string.isRequired,
  rc: PropTypes.string.isRequired,
};

export default CreateAccount;
