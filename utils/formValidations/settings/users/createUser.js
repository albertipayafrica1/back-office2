import * as yup from "yup";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const createUser = yup.object({
  fullName: yup
    .string("Full Name is required")
    .required("Full Name is required"),
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email")
    .required("email is required"),
  telephoneCountryCode: yup.string("Country code is required"),
  contactNumber: yup
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
    }),
  role: yup.string().required("Role is required"),
  privileges: yup
    .array()
    .test("privileges", "privileges must be strings", (val) => {
      return val.map((item) => typeof item === "string");
    }),
});
