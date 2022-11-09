import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const generateGatewayLink = yup.object({
  name: yup.string("field must be a string").required("Name is required"),
  email: yup
    .string()
    .strict()
    .trim("Kindly remove spaces before/after the email")
    .email("Please Enter a valid Email")
    .required("Email is required"),
  amount: yup.string("field must be a string").required("Amount is required"),
  telephoneCountryCode: yup
    .string("Country code is required")
    .required("Country Code is required"),
  phoneNumber: yup
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
          if (val === undefined || val === null || val === "") {
            return false;
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
    })
    .required("Contact Number is required"),
});
