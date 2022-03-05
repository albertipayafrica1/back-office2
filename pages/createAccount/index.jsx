import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import PropTypes from "prop-types";

import useForm from "../../hooks/useForm";
import { createAccount } from "../../utils/formValidations/createAccount";
import { countryOfOperation } from "../../utils/countryOfOperation";

import Carousel from "../../components/Carousel";
import CreateAccountForm from "../../components/CreateAccountForm";
import Auth from "../../components/Layouts/Auth";

const CreateAccount = ({ country, rc }) => {
  // console.log(data, "data from gssp");
  const router = useRouter();

  const [formData, handleFormChange, handleCheckboxChange] = useForm({
    surname: "",
    firstName: "",
    middleName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOperation: country,
    registrationDetails: "",
    revenue: "",
    businessType: "",
    ipayProducts: [],
    aboutUs: "Referral",
    referral: rc,
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
    generic: "",
  });

  const [success, setSuccess] = useState({
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");
  const [emailAlert, setEmailAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (
  //     formData.countryOfOperation === "" ||
  //     formData.countryOfOperation === undefined
  //   ) {
  //     return null;
  //   }
  //   const countryCode = countryOfOperationCode(formData.countryOfOperation);

  //   return router.replace(
  //     `/createAccount?country=${countryCode}&rc=${formData.referral}`
  //   );
  // }, [formData.countryOfOperation, formData.referral]);

  const handleCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ ...errors, generic: "" });

    if (formData.aboutUs === "social Media" || formData.aboutUs === "website") {
      formData.referral = "None";
      formData.ads = "None";
    }

    const isValid = await createAccount.isValid(formData, {
      abortEarly: false,
    });

    if (isValid && captchaToken !== "") {
      setEmailAlert(true);
      setSuccess({ message: "Success!" });
      // router.push("/login");
      setLoading(false);
    } else if (isValid && captchaToken === "") {
      setErrors({
        ...errors,
        captcha: "kindly verify the captcha",
      });
      setLoading(false);
    } else {
      await createAccount
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
          setLoading(false);
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
          success={success}
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

export const getServerSideProps = async (context) => {
  const { country, rc } = context.query;
  console.log(context.query);

  let givenCountryCode = country;
  const givenrc = rc;
  // console.log(givenrc, "givenrc");
  // var url = "";

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
        destination: `/createAccount?country=ke&rc=RC007`,
      },
    };
  }
  if (givenCountryCode !== undefined && givenrc === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: `/createAccount?country=${givenCountryCode}&rc=RC007`,
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
      country: givenCountry,
      rc: givenrc,
    },
  };
};

CreateAccount.propTypes = {
  country: PropTypes.string.isRequired,
  rc: PropTypes.string.isRequired,
};

export default CreateAccount;
