import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

import axios from "axios";

import { Stack, Typography, Divider, Box } from "@mui/material";

import { LoadingButton } from "@mui/lab";

import { Form, Formik } from "formik";

import PasswordStrengthBar from "react-password-strength-bar";
import debounce from "lodash/debounce";
import FormikControl from "../FormikControls";

import CreateAccountFormDiv from "../../atoms/CreateAccountFormDiv";

import Recaptcha from "../../atoms/Recaptcha";
import MuiAlert from "../../atoms/MuiAlert";

import {
  getCountryIconLink,
  countryOfOperationFullName,
  getTelephoneCountryCode,
} from "../../utils/countryOfOperation";
import { createAccount } from "../../utils/formValidations/createAccount";
import { telephoneCodes } from "../../utils/data";
import * as styles from "./styles";

import {
  revenue,
  registeredBusiness,
  unRegisteredBusiness,
  country,
  registration,
  kenyaIpayProducts,
  togoIpayProducts,
  tanzaniaIpayProducts,
  ugandaIpayProducts,
  aboutUs,
  ads,
  titleOptions,
  signUpDurationOptions,
} from "./data";

const CreateAccountForm = ({ countryCode, rc, emailAlertHandler }) => {
  const router = useRouter();
  const { query } = router;

  const [countryIconLink, setCountryIconLink] = useState(
    "https://icons.elipa.co/iPay_newlogo.svg"
  );
  const [countryRegulator, setCountryRegulator] = useState("Kenya");
  const [defaultTelephoneCode, setDefaultTelephoneCode] = useState({}); // since default value and actual form value is different for autocomplete we have this state
  const [formValues, setFormValues] = useState({
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    telephoneCountryCode: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOperation: countryCode,
    registrationDetails: "",
    signUpDuration: "",
    businessType: "",
    revenue: "",
    ipayProducts: [],
    aboutUs: "2",
    referral: rc,
    ads: "",
    privacy: [],
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [captchaToken, setCaptchaToken] = useState("");
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [captchaError, setCaptchaError] = useState("");

  const handleCaptchaToken = (token) => {
    setCaptchaToken(token);
  };

  const initialValues = {
    title: "",
    surname: "",
    firstName: "",
    middleName: "",
    telephoneCountryCode: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryOfOperation: countryCode,
    registrationDetails: "",
    signUpDuration: "",
    businessType: "",
    revenue: "",
    ipayProducts: [],
    aboutUs: "2",
    referral: rc,
    ads: "",
    privacy: [],
  };

  const updateRouteOnReferralChange = () => {
    if (
      formValues.countryOfOperation === "" ||
      formValues.countryOfOperation === undefined
    ) {
      return null;
    }
    return router.push(
      `/createAccount?country=${formValues.countryOfOperation}&rc=${formValues.referral}`,
      undefined,
      { shallow: true }
    );
  };

  const delayedQuery = useCallback(
    debounce(updateRouteOnReferralChange, 1000),
    [formValues.referral]
  );

  useEffect(() => {
    if (
      formValues.countryOfOperation === "" ||
      formValues.countryOfOperation === undefined
    ) {
      return null;
    }

    router.push(
      `/createAccount?country=${formValues.countryOfOperation}&rc=${formValues.referral}`,
      undefined,
      { shallow: true }
    );

    setCountryIconLink(getCountryIconLink(formValues.countryOfOperation));

    setDefaultTelephoneCode(
      getTelephoneCountryCode(formValues.countryOfOperation)
    );
    return setCountryRegulator(countryOfOperationFullName(query.country));
  }, [formValues.countryOfOperation, query.country]);

  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [formValues.referral, delayedQuery]);

  const handleSubmit = (values, formikHelpers) => {
    emailAlertHandler(false, "");
    setLoading(true);
    setAlert({
      type: "",
      message: "",
    });

    if (captchaToken !== "") {
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

      const config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(values),
        withCredentials: true,
      };
      axios(config)
        .then((response) => {
          setCaptchaError("");
          setResetCaptcha(true);
          if (response.data.success === true) {
            emailAlertHandler(true, values.firstName);
            setTimeout(() => {
              router.replace(
                `/login?country=${countryCode}&status=newAccountCreated`
              );
            }, 3000);
          } else {
            console.log(response, "response0");
            setLoading(false);
            setCaptchaToken("");
            setResetCaptcha(true);
            setAlert({
              type: "error",
              message: "Something Went Wrong",
            });
          }
        })
        .catch((error) => {
          console.log(error.response, "response");
          setLoading(false);
          setCaptchaToken("");
          setResetCaptcha(true);

          if (error.response === undefined) {
            setAlert({ type: "error", message: "Something Went Wrong" });
          } else if (error.response.status === 401) {
            setAlert({ type: "error", message: error.response.data.response });
          } else if (error.response.status === 406) {
            formikHelpers.setErrors({ ...error.response.data.response });
            setAlert({
              type: "error",
              message: "Kindly Resolve Form Errors",
            });
          } else if (error.response) {
            if (error.response.data.response !== undefined) {
              setAlert({
                type: "error",
                message: error.response.data.response,
              });
            } else {
              setAlert({
                type: "error",
                message: error.response.data.response,
              });
            }
            console.log(error.response, "second if else");
          } else {
            setAlert({ type: "error", message: "Something Went Wrong" });
            console.log(error, "third if else");
          }
        });
    } else {
      setCaptchaError("kindly verify the captcha");
      setLoading(false);
      setResetCaptcha(true);
    }
  };

  return (
    <>
      <Stack sx={styles.topContainer} spacing={1}>
        <Box>
          <Image src={countryIconLink} alt="Logo" width={78} height={39} />
        </Box>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Typography variant="title6">Create Account</Typography>
          <Divider orientation="vertical" flexItem sx={styles.divider} />
          <Link href={`/login?country=${query.country}`}>
            <a style={styles.linkStyle}>
              <Typography variant="title6" sx={styles.blueText}>
                Login To Dashboard
              </Typography>
            </a>
          </Link>
        </Stack>
      </Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={createAccount}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => {
          // console.log(formik.values, "fork");
          return (
            <Form>
              <Stack sx={styles.formContainer} spacing={8}>
                <CreateAccountFormDiv topLabel="Personal Details">
                  <Stack direction="column" spacing={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <Box sx={{ width: "100px" }}>
                        <FormikControl
                          control="select"
                          variant="outlined"
                          name="title"
                          label="Title"
                          type="text"
                          select
                          selectItem={titleOptions}
                          id="title"
                          required
                        />
                      </Box>
                      <FormikControl
                        control="input"
                        label="Surname"
                        name="surname"
                        variant="outlined"
                        type="text"
                        id="surname"
                        required
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="space-between"
                    >
                      <FormikControl
                        control="input"
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        type="text"
                        id="firstName"
                        required
                      />
                      <FormikControl
                        control="input"
                        label="Middle Name"
                        name="middleName"
                        variant="outlined"
                        type="text"
                        id="middleName"
                      />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Box>
                        {/* <FormikControl
                          control="input"
                          name="telephoneCountryCode"
                          label="Code"
                          type="text"
                          select
                          selectItem={telephoneCodes}
                          id="telephoneCountryCode"
                          required
                          defaultValue={formik.values.countryOfOperation}
                        /> */}
                        <FormikControl
                          control="autocomplete"
                          name="telephoneCountryCode"
                          label="Code"
                          use="telephoneCountryCode"
                          options={telephoneCodes}
                          required
                          defaultValue={defaultTelephoneCode}
                        />
                      </Box>
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="contactNumber"
                        label="Contact Number"
                        type="number"
                        id="contactNumber"
                        required
                        haveTooltip
                        tooltipText="Enter Your Contact number without country code"
                      />
                    </Stack>
                    <FormikControl
                      control="input"
                      label="Email"
                      name="email"
                      variant="outlined"
                      type="text"
                      id="email"
                      required
                      haveTooltip
                      tooltipText="Enter Your Email"
                    />
                    <FormikControl
                      control="input"
                      label="Password"
                      name="password"
                      variant="outlined"
                      type="password"
                      id="password"
                      required
                      fastField={false}
                    />
                    <PasswordStrengthBar
                      password={formik.values.password}
                      barColors={[
                        "#ddd",
                        "#ef4836",
                        "#f6b44d",
                        "#2b90ef",
                        "#15A112",
                      ]}
                    />
                    <FormikControl
                      control="input"
                      label="Confirm Password"
                      name="confirmPassword"
                      variant="outlined"
                      type="password"
                      id="confirmPassword"
                      required
                      fastField={false}
                    />
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="countryOfOperation"
                      label="Country Of Operation"
                      type="text"
                      select
                      selectItem={country}
                      id="countryOfOperation"
                      required
                      haveTooltip
                      tooltipText="Select Your Country Of Operation"
                      defaultValue={formik.values.countryOfOperation}
                      onChange={(e) => {
                        if (formik.values.ipayProducts.includes("2")) {
                          formik.setFieldValue("ipayProducts", ["2"]);
                        } else {
                          formik.setFieldValue("ipayProducts", []);
                        }
                        formik.setFieldValue(
                          "countryOfOperation",
                          e.target.value
                        );
                        setFormValues({
                          ...formValues,
                          countryOfOperation: e.target.value,
                        });
                      }}
                    />
                  </Stack>
                </CreateAccountFormDiv>
                <CreateAccountFormDiv topLabel="Tell us about your business">
                  <Stack direction="column" spacing={2}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="registrationDetails"
                      label="Registration Details"
                      type="text"
                      select
                      selectItem={registration}
                      id="registrationDetails"
                      required
                      onChange={(e) => {
                        formik.setFieldValue(
                          "registrationDetails",
                          e.target.value
                        );
                        formik.setFieldValue("businessType", "");
                        formik.setFieldValue("signUpDuration", "");
                      }}
                    />
                    {formik.values.registrationDetails === "2" && (
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="signUpDuration"
                        label="Sign Up Duration"
                        type="text"
                        select
                        selectItem={signUpDurationOptions}
                        id="signUpDuration"
                        required
                        onChange={(e) => {
                          formik.setFieldValue(
                            "signUpDuration",
                            e.target.value
                          );
                          formik.setFieldValue("businessType", "");
                        }}
                      />
                    )}
                    {formik.values.registrationDetails === "1" && (
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="businessType"
                        label="Business Type"
                        type="text"
                        select
                        selectItem={registeredBusiness}
                        id="businessType"
                        required
                      />
                    )}
                    {formik.values.registrationDetails === "2" &&
                      formik.values.signUpDuration === "1" && (
                        <FormikControl
                          control="input"
                          variant="outlined"
                          name="businessType"
                          label="Business Type"
                          type="text"
                          select
                          selectItem={unRegisteredBusiness}
                          id="businessType"
                          required
                        />
                      )}

                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="revenue"
                      label="Your monthly estimated revenue"
                      type="text"
                      select
                      selectItem={revenue}
                      id="revenue"
                      required
                      haveTooltip
                      tooltipText="What is your monthly estimated revenue?"
                    />

                    <FormikControl
                      control="checkbox"
                      options={
                        (formik.values.countryOfOperation === "TG" &&
                          togoIpayProducts) ||
                        (formik.values.countryOfOperation === "KE" &&
                          kenyaIpayProducts) ||
                        (formik.values.countryOfOperation === "UG" &&
                          ugandaIpayProducts) ||
                        (formik.values.countryOfOperation === "TZ" &&
                          tanzaniaIpayProducts) ||
                        kenyaIpayProducts
                      }
                      label={
                        formik.values.countryOfOperation === "KE"
                          ? "Choose iPay Products"
                          : "Choose eLipa Products"
                      }
                      name="ipayProducts"
                      required
                    />
                  </Stack>
                </CreateAccountFormDiv>
                <CreateAccountFormDiv topLabel="How did you know about us?">
                  <Stack direction="column" spacing={2}>
                    <FormikControl
                      control="input"
                      variant="outlined"
                      name="aboutUs"
                      label="About Us"
                      type="text"
                      select
                      required
                      selectItem={aboutUs}
                      id="aboutUs"
                      onChange={(e) => {
                        if (e.target.value === "1") {
                          formik.setFieldValue("referral", "");
                        } else if (e.target.value === "2") {
                          formik.setFieldValue("ads", "");
                          formik.setFieldValue("referral", rc);
                        } else {
                          formik.setFieldValue("ads", "");
                          formik.setFieldValue("referral", "");
                        }
                        formik.setFieldValue("aboutUs", e.target.value);
                      }}
                    />
                    {formik.values.aboutUs === "2" && (
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="referral"
                        required
                        label="Referral Code"
                        type="text"
                        id="referralCode"
                        onChange={(e) => {
                          formik.setFieldValue("referral", e.target.value);
                          setFormValues({
                            ...formValues,
                            referral: e.target.value,
                          });
                        }}
                      />
                    )}
                    {formik.values.aboutUs === "1" && (
                      <FormikControl
                        control="input"
                        variant="outlined"
                        name="ads"
                        label="Where did you see the Ad"
                        type="text"
                        select
                        selectItem={ads}
                        id="ads"
                        required
                      />
                    )}
                  </Stack>
                </CreateAccountFormDiv>
                <Stack direction="row">
                  <FormikControl
                    control="checkbox"
                    options={[
                      {
                        key: (
                          <Typography variant="subtitle3">
                            By clicking on submit you agree to share your
                            information with iPay who agrees to use it as per
                            their
                            <a
                              style={styles.linkStyle}
                              href="https://www.ipayafrica.com/info/privacy-policy"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {" "}
                              privacy policy
                            </a>
                          </Typography>
                        ),
                        value: "true",
                      },
                    ]}
                    name="privacy"
                  />
                </Stack>
                <CreateAccountFormDiv>
                  <Recaptcha
                    captchaError={captchaError}
                    handleCaptchaToken={handleCaptchaToken}
                    resetCaptcha={resetCaptcha}
                  />
                </CreateAccountFormDiv>
                <Stack direction="row" justifyContent="center">
                  <Typography variant="subtitle3" sx={styles.recaptchaText}>
                    This page is protected by Google <b>recaptcha</b> to ensure
                    you’re not a bot.
                    <Link href="/">
                      <a style={styles.linkStyle}> Learn more</a>
                    </Link>
                  </Typography>
                </Stack>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={styles.submitButton}
                  disabled={!formik.isValid}
                >
                  Create Account
                </LoadingButton>

                <Stack spacing={2} sx={{ mt: 4 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{ mr: 4 }}
                  >
                    <Typography variant="title6" sx={{ mr: 2 }}>
                      Need help?
                    </Typography>
                    <Link href="/">
                      <a>
                        <Typography variant="title6" sx={styles.contactUs}>
                          Contact Us
                        </Typography>
                      </a>
                    </Link>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mr: 4 }}
                  >
                    <Typography variant="subtitle3">
                      Authorised Payment Services Provider Regulated by the
                      Central Bank of {countryRegulator}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
      {alert.type !== "" && alert.message !== "" && (
        <MuiAlert variant={alert.type} message={alert.message} />
      )}
    </>
  );
};

CreateAccountForm.propTypes = {
  countryCode: PropTypes.string.isRequired,
  rc: PropTypes.string.isRequired,
  emailAlertHandler: PropTypes.func.isRequired,
};
export default CreateAccountForm;
