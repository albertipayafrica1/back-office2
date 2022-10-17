import * as yup from "yup";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const pos = yup.object({
  subAccountId: yup.string().required("Sub Account Id is required"),
  subAccountName: yup.string().required("Sub Account Name is required"),
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email")
    .required("Email is required"),
  telephoneCountryCode: yup
    .string("Country code is required")
    .required("Country code is required"),
  phoneNumber: yup
    .string("Enter your mobile number")
    .when("telephoneCountryCode", (telephoneCountryCode) => {
      if (
        telephoneCountryCode !== undefined ||
        telephoneCountryCode !== null ||
        telephoneCountryCode !== ""
      ) {
        return yup
          .string()
          .test("mobileNumber", "Kindly enter a valid mobile number", (val) => {
            if (val === "" || val === undefined || val === null) {
              return true;
            }
            try {
              const number = phoneUtil.parseAndKeepRawInput(
                val,
                telephoneCountryCode
              );
              return phoneUtil.isValidNumberForRegion(
                number,
                telephoneCountryCode
              );
            } catch (err) {
              return false;
            }
          });
      }
      return true;
    })
    .required("Phone number is required"),
  helplineTelephoneCountryCode: yup
    .string("Country code is required")
    .required("Country code is required"),
  helpline: yup
    .string("Enter your mobile number")
    .when("helplineTelephoneCountryCode", (telephoneCountryCode) => {
      if (
        telephoneCountryCode !== undefined ||
        telephoneCountryCode !== null ||
        telephoneCountryCode !== ""
      ) {
        return yup
          .string()
          .test("mobileNumber", "Kindly enter a valid mobile number", (val) => {
            if (val === "" || val === undefined || val === null) {
              return true;
            }
            try {
              const number = phoneUtil.parseAndKeepRawInput(
                val,
                telephoneCountryCode
              );
              return phoneUtil.isValidNumberForRegion(
                number,
                telephoneCountryCode
              );
            } catch (err) {
              return false;
            }
          });
      }
      return true;
    })
    .required("Helpline is required"),
  reference: yup.string().required("Reference is required"),
  callbackUrl: yup
    .string()
    .url("Enter a valid url")
    .required("Call back url is required"),
  securityKey: yup.string().required("Security Key is required"),
});
