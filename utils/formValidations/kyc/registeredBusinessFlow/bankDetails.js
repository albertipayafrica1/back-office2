import * as yup from "yup";

export const bankDetails = yup.object({
  banklocation: yup
    .string("Enter your Bank lacation")
    .required("Bank lacation is required"),
  bankname: yup
    .string("Enter your bank name")
    .required("Bank location is required"),
  bankbranch: yup
    .string("Enter bank branch")
    .required("Branch name is required"),
  accountname: yup
    .string("Enter your account name")
    .required("account name is required"),
  accountnumber: yup
    .string("Enter your account number")
    .required("Account number is required"),
  currency: yup.string("Enter your currency").required("Currency is required"),
  swiftcode: yup
    .string("Enter your swift code")
    .required("Swift code is required"),
});
