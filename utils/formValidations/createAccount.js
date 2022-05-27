import * as yup from "yup";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const createAccount = yup.object().shape({
  title: yup.string("title must be a string").required("Title is required"),
  surname: yup
    .string("Surname must be a string")
    .required("Surname is required"),
  firstName: yup
    .string("First Name must be a string")
    .required("First Name is required"),
  middleName: yup.string("Middle Name must be a string"),
  telephoneCountryCode: yup
    .string("Country code is required")
    .required("Country Code is Required"),
  contactNumber: yup
    .string("Enter your contact number")
    .when("telephoneCountryCode", (telephoneCountryCode) => {
      if (
        telephoneCountryCode === undefined ||
        telephoneCountryCode === null ||
        telephoneCountryCode === ""
      ) {
        return yup
          .string()
          .test(
            "telephoneCountryCode",
            "Kindly enter country Code before entering contact number",
            (val) => {
              if (val === undefined || val === null || val === "") {
                return false;
              }
              return true;
            }
          );
      }
      return yup
        .string()
        .test("phoneNumber", "Kindly enter a valid contact number", (val) => {
          console.log(telephoneCountryCode, "tcc");
          if (val === undefined || val === null || val === "") {
            return false;
          }
          try {
            const number = phoneUtil.parseAndKeepRawInput(
              val,
              telephoneCountryCode
            );
            console.log(phoneUtil.getRegionCodeForNumber(number));
            return phoneUtil.isValidNumberForRegion(
              number,
              telephoneCountryCode
            );
          } catch (err) {
            return false;
          }
        });
    })
    .required("Contact Number is required"),

  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/,
      "Your password must be at least 8 characters and contain at least one capital letter, one lowercase letter, one number and one special character."
    ),
  confirmPassword: yup
    .string()
    .required("Please re-enter your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  countryOfOperation: yup
    .string()
    .required("Kindly select the country of you operation"),
  registrationDetails: yup
    .string()
    .required("kindly selection of the given options"),
  signUpDuration: yup.string().when("registrationDetails", (details) => {
    if (details === "2") {
      return yup.string().required("Sign Up Duration is required");
    }
    return yup.string();
  }),
  businessType: yup.string().when("registrationDetails", (details) => {
    if (details === "1") {
      return yup.string().required("Business Type is required");
    }
    return yup.string().when("signUpDuration", (duration) => {
      if (duration === "2") {
        return yup.string().required("Business Type is required");
      }
      return yup.string();
    });
  }),
  revenue: yup.string().required("Kindly select your estimated revenue"),
  ipayProducts: yup
    .array()
    .min(1, "Select atleast 1 item")
    .required("Select atleast 1 item"),
  aboutUs: yup.string().required("Kindly select one option"),
  referral: yup.string().when("aboutUs", {
    is: "2",
    then: yup.string().required("Kindly enter a referral code"),
  }),
  ads: yup.string().when("aboutUs", {
    is: "1",
    then: yup.string().required("Kindly select where you've seen the ad"),
  }),
  privacy: yup
    .array()
    .min(1, "Field must be checked")
    .required("Field must be checked"),
});
