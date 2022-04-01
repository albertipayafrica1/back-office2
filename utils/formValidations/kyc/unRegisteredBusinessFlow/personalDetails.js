import * as yup from "yup";
import { differenceInYears } from "date-fns";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const personalDetails = yup.object({
  personalInformation: yup.object({
    title: yup.string().required("kindly enter the title"),
    surname: yup.string().required("kindly enter the surname"),
    firstName: yup.string().required("kindly enter the first name"),
    middleName: yup.string(),
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
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is required"),
    gender: yup.string().required("kindly select gender"),
    maritalStatus: yup.string().required("kindly select your marital status"),
    dateOfBirth: yup
      .date()
      .required("kindly select your date of birth")
      .test("dob", "Your age must be over 18 years", function (value) {
        return differenceInYears(new Date(), new Date(value)) >= 18;
      }),
    countryOfOperation: yup
      .string()
      .required("kindly select your country of operation"),
    documentType: yup.string().required("kindly select a document Type"),
    documentNumber: yup.string().required("kindly enter your document number"),
    taxPinNumber: yup.string().required("kindly enter your tax PIN number"),
    nationalIdFront: yup
      .array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      )
      .when("documentType", (documentType) => {
        if (documentType === "1") {
          return yup
            .array(
              yup
                .object({
                  url: yup.string().required("This file is required"),
                })
                .required("This file is required")
            )
            .min(1, "This file is required")
            .required("This file is required");
        }
        return yup.array(
          yup
            .object({
              url: yup.string().required("This file is required"),
            })
            .required("This file is required")
        );
      }),
    nationalIdBack: yup
      .array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      )
      .when("documentType", (documentType) => {
        if (documentType === "1") {
          return yup
            .array(
              yup
                .object({
                  url: yup.string().required("This file is required"),
                })
                .required("This file is required")
            )
            .min(1, "This file is required")
            .required("This file is required");
        }
        return yup.array(
          yup
            .object({
              url: yup.string().required("This file is required"),
            })
            .required("This file is required")
        );
      }),
    passport: yup
      .array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      )
      .when("documentType", (documentType) => {
        if (documentType === "2") {
          return yup
            .array(
              yup
                .object({
                  url: yup.string().required("This file is required"),
                })
                .required("This file is required")
            )
            .min(1, "This file is required")
            .required("This file is required");
        }
        return yup.array(
          yup
            .object({
              url: yup.string().required("This file is required"),
            })
            .required("This file is required")
        );
      }),
    passportSizePhoto: yup
      .array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      )
      .min(1, "This file is required")
      .required("This file is required"),
    pinCertificate: yup
      .array(
        yup
          .object({
            url: yup.string().required("This file is required"),
          })
          .required("This file is required")
      )
      .min(1, "This file is required")
      .required("This file is required"),
  }),
  plan: yup.object({
    signUpDuration: yup.string().required("kindly select your signUp Duration"),
    purpose: yup
      .string("kindly select the purpose of your business")
      .when("signUpDuration", (signUpDuration) => {
        if (signUpDuration === "1") {
          return yup
            .string("kindly select the purpose of your business")
            .required("kindly select the purpose of your business");
        }
        return yup.string("kindly select the purpose of your business");
      }),

    description: yup
      .string()

      .when("signUpDuration", (signUpDuration) => {
        if (signUpDuration === "2") {
          return yup
            .string("Kindly enter your business description")
            .test(
              "len",
              "your description must have atleast 150 characters",
              (val) => {
                if (val === undefined || val === null || val === "") {
                  return false;
                }
                return val.length >= 150;
              }
            )
            .required("Kindly enter your business description");
        }
        return yup.string("Kindly enter your business description");
      }),
  }),

  address: yup.object({
    physicalAddress: yup
      .string()
      .required("kindly enter your business physical Address"),
    postalAddress: yup
      .string()
      .required("kindly enter your business postal address"),
    postalCode: yup.string(),
    city: yup.string().required("kindly enter your city/town "),
    county: yup.string(),
    websiteLink: yup.string().url("Enter a valid url"),
    appDownloadLink: yup.string().url("Enter a valid url"),
  }),
});
