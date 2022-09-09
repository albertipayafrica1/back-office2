import * as yup from "yup";
import { differenceInMinutes } from "date-fns";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const createPaymentLink = yup.object({
  amount: yup
    .string()
    .test("amount", "Kindly enter a valid amount", (val) => {
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
  changeAmount: yup.array().min(0),
  // minAmount: yup.string().when("changeAmount", (changeAmount) => {
  //   if (changeAmount.length === 0) {
  //     return yup
  //       .string()
  //       .test("minAmount", "Kindly enter a valid minimum amount", (val) => {
  //         if (val === undefined || val === null || val === "") {
  //           return false;
  //         }
  //         const parsedValue = parseInt(val, 10);
  //         if (parsedValue <= 0) {
  //           return false;
  //         }
  //         return true;
  //       });
  //   }
  //   return true;
  // }),
  paymentDescription: yup
    .string()
    .test("len", "your description less than 20 characters", (val) => {
      if (val === undefined || val === null || val === "") {
        return false;
      }
      return val.length <= 20;
    })
    .required("Kindly enter your business description"),
  recurringPayment: yup.array().min(0),
  orderId: yup.string("Order Id must be a string"),
  linkId: yup.string().required("Link Id is required"),
  customerDetails: yup.object({
    name: yup.string("field must be a string"),
    email: yup
      .string()
      .strict()
      .trim("Kindly remove spaces before/after the email")
      .email("Please Enter a valid Email"),
    telephoneCountryCode: yup.string("Country code is required"),
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
            .test(
              "mobileNumber",
              "Kindly enter a valid mobile number",
              (val) => {
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
              }
            );
        }
        return true;
      }),
  }),
  noExpiry: yup.array().min(0),
  linkExpirationDate: yup
    .date()
    .nullable()
    .typeError("Invalid Date")
    .when("noExpiry", (noExpiry) => {
      if (noExpiry.length === 0) {
        return yup
          .date()
          .nullable()
          .test(
            "dod",
            "valid date of link expiry is required",
            function (value) {
              if (value === null || value === undefined) {
                return false;
              }
              return differenceInMinutes(new Date(value), new Date()) >= 0;
            }
          );
      }
      return true;
    }),
});
