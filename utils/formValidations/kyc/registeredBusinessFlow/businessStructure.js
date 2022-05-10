import * as yup from "yup";
import { differenceInYears } from "date-fns";

const phoneUtil =
  require("google-libphonenumber").PhoneNumberUtil.getInstance();

export const businessStructure = yup.object({
  businessRepresentative: yup.object({
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
      .strict()
      .trim("Kindly remove spaces before/after the email")
      .email("Please Enter a valid Email")
      .required("Email is required"),
    gender: yup.string().required("kindly select gender"),
    dateOfBirth: yup
      .date()
      .required("kindly select your date of birth")
      .test("dob", "Your age must be over 18 years", function (value) {
        if (value === null || value === undefined) {
          return false;
        }
        return differenceInYears(new Date(), new Date(value)) >= 18;
      }),
    countryOfOperation: yup
      .string()
      .required("kindly select your country of operation"),
    documentType: yup.string().required("kindly select a document Type"),
    documentNumber: yup.string().required("kindly enter your document number"),
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
  registeredBusinessDetails: yup.object({
    businessName: yup.string().required("kindly enter your business name"),
    businessRegistrationNumber: yup
      .string()
      .required("kindly enter your business registration number"),
    businessCategory: yup
      .string()
      .required("kindly select your business category"),
    businessSubCategory: yup
      .string()
      .required("kindly select your business sub category"),
    businessTaxPin: yup.string().required("kindly enter your business tax pin"),
    telephoneCountryCode: yup
      .string("Country code is required")
      .required("Country Code is Required"),
    businessTelephone: yup
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
    businessEmail: yup
      .string()
      .strict()
      .trim("Kindly remove spaces before/after the email")
      .email("Please Enter a valid Email")
      .required("Kindly Enter your business Email"),
    businessCurrency: yup
      .string()
      .required("Kindly select your business currency"),
    businessDescription: yup
      .string()
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
      .required("Kindly enter your business description"),
  }),

  businessLocation: yup.object({
    physicalAddress: yup
      .string()
      .required("kindly enter your business physical Address"),
    postalAddress: yup
      .string()
      .required("kindly enter your business postal address"),
    postalCode: yup.string().required("kindly enter your business postal code"),
    city: yup.string().required("kindly enter your city/town "),
    county: yup.string("Kindly enter county"),
    websiteLink: yup.string().url("Enter a valid url"),
    appDownloadLink: yup.string().url("Enter a valid url"),
  }),
  numberOfBeneficialOwners: yup
    .string()
    .test(
      "value",
      "Number of beneficiaries must be between 1 and 5",
      (val) => Number(val) >= 1 && Number(val) <= 5
    )
    .required("kindly enter the number of beneficial owners"),
  ultimateBeneficialOwners: yup.array().of(
    yup.object().shape({
      title: yup.string().required("kindly enter the title"),
      surname: yup.string().required("kindly enter the surname"),
      firstName: yup.string().required("kindly enter the first name"),
      middleName: yup.string(),
      shareHolderType: yup
        .string()
        .required("kindly select a shareholder type"),
      otherShareHolderType: yup.string().when("shareHolderType", {
        is: "4",
        then: yup.string().required("Kindly enter your shareholding type"),
      }),
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
            .test(
              "phoneNumber",
              "Kindly enter a valid contact number",
              (val) => {
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
              }
            );
        })
        .required("Contact Number is required"),
      email: yup
        .string()
        .strict()
        .trim("Kindly remove spaces before/after the email")
        .email("Please Enter a valid Email")
        .required("Email is required"),
      documentType: yup.string().required("kindly select document Type"),
      documentNumber: yup.string().required("kindly enter document number"),
      // nationalIdFront: yup.string().when("documentType", {
      //   is: "1",
      //   then: yup
      //     .array(
      //       yup
      //         .object({
      //           url: yup.string().required("This file is required"),
      //         })
      //         .required("This file is required")
      //     )
      //     .min(1, "This file is required")
      //     .required("This file is required"),
      // }),
      // nationalIdBack: yup.string().when("documentType", {
      //   is: "1",
      //   then: yup
      //     .array(
      //       yup
      //         .object({
      //           url: yup.string().required("This file is required"),
      //         })
      //         .required("This file is required")
      //     )
      //     .min(1, "This file is required")
      //     .required("This file is required"),
      // }),
      // passport: yup.string().when("documentType", {
      //   is: "2",
      //   then: yup
      //     .array(
      //       yup
      //         .object({
      //           url: yup.string().required("This file is required"),
      //         })
      //         .required("This file is required")
      //     )
      //     .min(1, "This file is required")
      //     .required("This file is required"),
      // }),

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
      nationality: yup.string().required("kindly select your nationality"),
      numberOfBeneficiaries: yup
        .string()
        .test(
          "value",
          "Number of beneficiaries must be between 1 and 5",
          (val) => Number(val) === 1
        )
        .required("kindly enter the number of beneficial owners"),
      nextOfKin: yup.array().of(
        yup.object().shape({
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
                .test(
                  "phoneNumber",
                  "Kindly enter a valid contact number",
                  (val) => {
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
                  }
                );
            })
            .required("Contact Number is required"),
          email: yup
            .string()
            .strict()
            .trim("Kindly remove spaces before/after the email")
            .email("Please Enter a valid Email"),
          relationship: yup
            .string()
            .required("kindly enter you relationship with your next of Kin"),
          dateOfBirth: yup.date().required("kindly select your date of birth"),
          documentType: yup.string().required("kindly select a document Type"),
          documentNumber: yup.string().required("kindly enter document number"),
          // below is for reference in case
          // birthCertificate: yup
          //   .array(
          //     yup
          //       .object({
          //         url: yup.string().required("This file is required"),
          //       })
          //       .required("This file is required")
          //   )
          //   .when("documentType", (documentType) => {
          //     if (documentType === "3") {
          //       return yup
          //         .array(
          //           yup
          //             .object({
          //               url: yup.string().required("This file is required"),
          //             })
          //             .required("This file is required")
          //         )
          //         .min(1, "This file is required")
          //         .required("This file is required");
          //     }
          //     return yup.array(
          //       yup
          //         .object({
          //           url: yup.string().required("This file is required"),
          //         })
          //         .required("This file is required")
          //     );
          //   }),
          // percentageBeneficiary: yup
          //   .string()
          //   .test(
          //     "value",
          //     "Percentage share of your next of kin must be between 1 and 100",
          //     (val) => Number(val) >= 1 && Number(val) <= 100
          //   )
          //   .required(
          //     "kindly enter the share of your next of kin between 1-100"
          //   ),
        })
      ),
    })
  ),
});
