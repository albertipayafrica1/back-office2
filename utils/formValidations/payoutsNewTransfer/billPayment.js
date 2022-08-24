import * as yup from "yup";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const billPayment = yup.object({
  billType: yup.string().required("Bill type is required"),
  provider: yup.string().required("Provider is required"),
  telephoneCountryCode: yup
    .string("Country code is required")
    .required("Country Code is Required"),
  mobileNumber: yup
    .string("Enter your mobile number")
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
            "Kindly enter country Code before entering mobile number",
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
        .test("mobileNumber", "Kindly enter a valid mobile number", (val) => {
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
    .required("mobile Number is required"),

  accountNumber: yup.string().required("Account number is required"),

  amount: yup
    .string()
    .test("amount", "Kindly enter a valid amount", (val) => {
      console.log(val);
      if (val === undefined || val === null || val === "") {
        return false;
      }
      const parsedValue = parseInt(val, 10);
      if (parsedValue <= 0) {
        return false;
      }
      return true;
    })
    .required("Amount is required"),
});
