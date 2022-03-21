import * as yup from "yup";

export const businessStructure = yup.object({
  businessRepresentative: yup.object({
    title: yup.string().required("kindly enter the title"),
    surname: yup.string().required("kindly enter the surname"),
    firstName: yup.string().required("kindly enter the first name"),
    middleName: yup.string().required("kindly enter the middle name"),
    contactNumber: yup
      .string("Enter your contact number")
      .required("Contact Number is required")
      .matches(
        /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Enter a valid phone number"
      ),
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is required"),
    gender: yup.string().required("kindly select gender"),
    maritalStatus: yup.string().required("kindly select your marital status"),
    dateOfBirth: yup.date().required("kindly select your date of birth"),
    countryOfOperation: yup
      .string()
      .required("kindly select your country of operation"),
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
    businessTelephone: yup
      .string("Enter your contact number")
      .required("Contact Number is required")
      .matches(
        /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Enter a valid phone number"
      ),
    businessEmail: yup
      .string()
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
      middleName: yup.string().required("kindly enter the middle name"),
      shareHolderType: yup
        .string()
        .required("kindly select a shareholder type"),
      otherShareHolderType: yup.string().when("shareHolderType", {
        is: "4",
        then: yup.string().required("Kindly enter your shareholding type"),
      }),
      contactNumber: yup
        .string("Enter your contact number")
        .required("Contact Number is required")
        .matches(
          /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Enter a valid phone number"
        ),
      email: yup
        .string()
        .email("Please Enter a valid Email")
        .required("Email is required"),
      documentType: yup.string().required("kindly select document Type"),
      documentNumber: yup.string().required("kindly enter document number"),
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
          middleName: yup.string().required("kindly enter the middle name"),
          contactNumber: yup
            .string("Enter your contact number")
            .required("Contact Number is required")
            .matches(
              /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
              "Enter a valid phone number"
            ),
          email: yup
            .string()
            .email("Please Enter a valid Email")
            .required("Email is required"),
          relationship: yup
            .string()
            .required("kindly enter you relationship with your next of Kin"),
          percentageBeneficiary: yup
            .string()
            .test(
              "value",
              "Percentage share of your next of kin must be between 1 and 100",
              (val) => Number(val) >= 1 && Number(val) <= 100
            )
            .required(
              "kindly enter the share of your next of kin between 1-100"
            ),
        })
      ),
    })
  ),
});
