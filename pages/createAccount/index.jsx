import { useState } from "react";
import { useRouter } from "next/router";

import useForm from "../../hooks/useForm";
import { createAccountFormValidation } from "../../utils/createAccountFormValidation";

import Carousel from "../../components/Carousel";
import CreateAccountForm from "../../components/CreateAccountForm";
import Auth from "../../components/Layouts/Auth";

const CreateAccount = () => {
  const router = useRouter();
  const [formData, handleFormChange, handleCheckboxChange] = useForm({
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
    ipayProducts: [],
    aboutUs: "",
    referral: "RC0007",
    ads: "GDN",
    privacy: [],
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
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCaptchaToken = (token) => {
    console.log(token, "captchatoken");
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.aboutUs === "social Media" || formData.aboutUs === "website") {
      formData.referral = "None";
      formData.ads = "None";
    }

    console.log(formData, "dsf");

    const isValid = await createAccountFormValidation.isValid(formData, {
      abortEarly: false,
    });
    console.log(captchaToken, "ct");
    if (isValid && captchaToken !== "") {
      setEmailAlert(true);
      // router.push("/login");
      setLoading(false);
    } else if (isValid && captchaToken === "") {
      setErrors({
        ...errors,
        captcha: "kindly verify the captcha",
      });
    } else {
      await createAccountFormValidation
        .validate(formData, { abortEarly: false })
        .catch((err) => {
          let errs = err.inner.reduce((acc, error) => {
            return {
              ...acc,
              [error.path]: error.message,
            };
          }, {});
          if (captchaToken === "") {
            errs = {
              ...errs,
              captcha: "kindly Verify the captcha",
            };
          }
          setErrors(errs);
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
          handleCheckboxChange={handleCheckboxChange}
          errors={errors}
          handleSubmit={handleSubmit}
          handleCaptchaToken={handleCaptchaToken}
          loading={loading}
        />
      }
      alert={emailAlert}
      nameOnAlert={formData.firstName}
    />
  );
};

export default CreateAccount;
