import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

import {
  Stack,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import PasswordStrengthBar from "react-password-strength-bar";

import CreateAccountFormDiv from "../../atoms/CreateAccountFormDiv";
import CustomInput from "../../atoms/CustomInput";
import CheckBoxes from "../../atoms/CheckBoxes";
import Recaptcha from "../../atoms/Recaptcha";

import * as styles from "./styles";

import {
  revenue,
  business,
  country,
  registration,
  kenyaIpayProducts,
  togoIpayProducts,
  tanzaniaIpayProducts,
  ugandaIpayProducts,
  aboutUs,
  ads,
} from "./data";

const CreateAccountForm = ({
  formData,
  handleFormChange,
  handleCheckboxChange,
  errors,
  handleSubmit,
  handleCaptchaToken,
  loading,
}) => {
  const router = useRouter();

  return (
    <>
      <Stack sx={styles.topContainer} spacing={1}>
        <Box>
          <Image src="/iPay-logo.svg" alt="iPay Logo" width={78} height={39} />
        </Box>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Typography variant="title6">Create Account</Typography>
          <Divider orientation="vertical" flexItem sx={styles.divider} />
          <Link href="/login">
            <a style={styles.linkStyle}>
              <Typography variant="title6" sx={styles.blueText}>
                Login To Dashboard
              </Typography>
            </a>
          </Link>
        </Stack>
      </Stack>
      <Stack
        sx={styles.formContainer}
        component="form"
        onSubmit={handleSubmit}
        spacing={8}
      >
        <CreateAccountFormDiv topLabel="Personal Details">
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <CustomInput
                variant="outlined"
                name="surname"
                label="Surname"
                type="text"
                id="surname"
                value={formData.surname}
                onChange={handleFormChange}
                error={!!errors.surname}
                helperText={errors.surname}
                required
              />
              <CustomInput
                variant="outlined"
                name="firstName"
                label="First Name"
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleFormChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
              />
              <CustomInput
                variant="outlined"
                name="middleName"
                label="Middle Name"
                type="text"
                id="middleName"
                value={formData.middleName}
                onChange={handleFormChange}
                error={!!errors.middleName}
                helperText={errors.middleName}
              />
            </Stack>

            <CustomInput
              variant="outlined"
              name="contactNumber"
              label="Contact Number"
              type="number"
              id="contactNumber"
              value={formData.contactNumber}
              onChange={handleFormChange}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
              required
            />

            <CustomInput
              variant="outlined"
              name="email"
              label="Email"
              type="text"
              id="email"
              value={formData.email}
              onChange={handleFormChange}
              error={!!errors.email}
              helperText={errors.email}
              required
              haveTooltip
              tooltipText="Enter Your Email"
            />
            <CustomInput
              variant="outlined"
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleFormChange}
              error={!!errors.password}
              helperText={errors.password}
              required
            />
            <PasswordStrengthBar
              password={formData.password}
              barColors={["#ddd", "#ef4836", "#f6b44d", "#2b90ef", "#15A112"]}
            />
            <CustomInput
              variant="outlined"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              required
            />
            <CustomInput
              variant="outlined"
              name="countryOfOperation"
              label="Country Of Operation"
              type="text"
              select
              selectItem={country}
              id="countryOfOperation"
              value={formData.countryOfOperation}
              onChange={handleFormChange}
              error={!!errors.countryOfOperation}
              helperText={errors.countryOfOperation}
              required
              haveTooltip
              tooltipText="Select Your Country Of Operation"
              defaultValue={formData.countryOfOperation}
            />
          </Stack>
        </CreateAccountFormDiv>
        <CreateAccountFormDiv topLabel="Tell us about your business">
          <Stack direction="column" spacing={2}>
            <CustomInput
              variant="outlined"
              name="registrationDetails"
              label="Registration Details"
              type="text"
              select
              selectItem={registration}
              id="registrationDetails"
              value={formData.registrationDetails}
              onChange={handleFormChange}
              error={!!errors.registrationDetails}
              helperText={errors.registrationDetails}
              required
            />

            <CustomInput
              variant="outlined"
              name="revenue"
              label="Your monthly estimated revenue"
              type="text"
              select
              selectItem={revenue}
              id="revenue"
              value={formData.revenue}
              onChange={handleFormChange}
              error={!!errors.revenue}
              helperText={errors.revenue}
              required
              haveTooltip
              tooltipText="What is your monthly estimated revenue?"
            />

            <CustomInput
              variant="outlined"
              name="businessType"
              label="Business Type"
              type="text"
              select
              selectItem={business}
              id="businessType"
              value={formData.businessType}
              onChange={handleFormChange}
              error={!!errors.businessType}
              helperText={errors.businessType}
              required
            />

            <CheckBoxes
              formFields={
                (formData.countryOfOperation === "Togo" && togoIpayProducts) ||
                (formData.countryOfOperation === "Kenya" &&
                  kenyaIpayProducts) ||
                (formData.countryOfOperation === "Uganda" &&
                  ugandaIpayProducts) ||
                (formData.countryOfOperation === "Tanzania" &&
                  tanzaniaIpayProducts) ||
                kenyaIpayProducts
              }
              fieldChecked={formData.ipayProducts}
              error={!!errors.ipayProducts}
              helperText={errors.ipayProducts}
              onChange={handleCheckboxChange}
              label="Choose iPay Products"
              fieldName="ipayProducts"
            />
          </Stack>
        </CreateAccountFormDiv>
        <CreateAccountFormDiv topLabel="How did you know about us?">
          <Stack direction="column" spacing={2}>
            <CustomInput
              variant="outlined"
              name="aboutUs"
              label="About Us"
              type="text"
              select
              selectItem={aboutUs}
              id="businessType"
              value={formData.aboutUs}
              onChange={handleFormChange}
              error={!!errors.aboutUs}
              helperText={errors.aboutUs}
            />
            {formData.aboutUs === "Referral" && (
              <CustomInput
                variant="outlined"
                name="referral"
                label="Referral Code"
                type="text"
                id="referralCode"
                value={formData.referral}
                onChange={handleFormChange}
                error={!!errors.referral}
                helperText={errors.referral}
                required
              />
            )}
            {formData.aboutUs === "Ads" && (
              <CustomInput
                variant="outlined"
                name="ads"
                label="Where did you see the Ad"
                type="text"
                select
                selectItem={ads}
                id="businessType"
                value={formData.ads}
                onChange={handleFormChange}
                error={!!errors.ads}
                helperText={errors.ads}
                defaultValue={ads[0]}
                required
              />
            )}
          </Stack>
        </CreateAccountFormDiv>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                sx={styles.checkbox}
                helperText={errors.privacy}
                onChange={handleCheckboxChange}
                name="privacy"
              />
            }
            label={
              <Typography variant="subtitle3">
                By clicking on submit you agree to share your information with
                iPay who agrees to use it as per their
                <Link href="/privacypolicy">
                  <a style={styles.linkStyle}> privacy policy</a>
                </Link>
              </Typography>
            }
            sx={styles.privacyControlLabel}
          />
          {errors.privacy && (
            <Typography
              variant="subtitle3"
              sx={styles.privacyControlErrorLabel}
            >
              {errors.privacy}
            </Typography>
          )}
        </Box>
        <CreateAccountFormDiv>
          <Recaptcha
            captchaError={errors.captcha}
            handleCaptchaToken={handleCaptchaToken}
          />
        </CreateAccountFormDiv>
        <Typography variant="subtitle3" sx={styles.recaptchaText}>
          This page is protected by Google <b>recaptcha</b> to ensure you’re not
          a bot.
          <Link href="/">
            <a style={styles.linkStyle}> Learn more</a>
          </Link>
        </Typography>
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          size="large"
          sx={styles.submitButton}
          onClick={handleSubmit}
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
              Authorised Payment Services Provider Regulated by the Central Bank
              of Kenya
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

CreateAccountForm.propTypes = {
  formData: PropTypes.shape({
    surname: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    countryOfOperation: PropTypes.string.isRequired,
    registrationDetails: PropTypes.string.isRequired,
    revenue: PropTypes.string.isRequired,
    businessType: PropTypes.string.isRequired,
    ipayProducts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    aboutUs: PropTypes.string.isRequired,
    referral: PropTypes.string.isRequired,
    ads: PropTypes.string.isRequired,
    privacy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    surname: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    countryOfOperation: PropTypes.string.isRequired,
    registrationDetails: PropTypes.string.isRequired,
    revenue: PropTypes.string.isRequired,
    businessType: PropTypes.string.isRequired,
    ipayProducts: PropTypes.string.isRequired,
    aboutUs: PropTypes.string.isRequired,
    referral: PropTypes.string.isRequired,
    ads: PropTypes.string.isRequired,
    privacy: PropTypes.string.isRequired,
    captcha: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCaptchaToken: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default CreateAccountForm;
