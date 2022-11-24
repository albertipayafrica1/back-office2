import * as yup from "yup";

export const bankDetails = yup.object({
  primaryAccount: yup.object({
    bankLocality: yup
      .string("Enter your Bank lacation")
      .required("Bank location is required"),
    bankName: yup
      .string("Enter your bank name")
      .required("Bank location is required"),
    bankBranch: yup
      .string("Enter bank branch")
      .required("Branch name is required"),
    accountName: yup
      .string("Enter your account name")
      .required("account name is required"),
    accountNumber: yup
      .string("Enter your account number")
      .required("Account number is required"),
    currency: yup
      .string("Enter your currency")
      .required("Currency is required"),
    swiftCode: yup
      .string("Enter your swift code")
      .required("Swift code is required"),
  }),
});
